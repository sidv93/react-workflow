import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddButton from '../components/AddButton';
import CloseButton from '../components/CloseButton';
import List from '../components/List';
import { useParams, Link } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { withLoader, deleteList, createList, getLists } from '../common/utils';

const BoardContainer = styled.div`
    max-width: 100vw;
    box-sizing: border-box;
`;

const ListsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 50px;
    align-items: center;
    justify-content: center;
`;

const Board = ({Loader}) => {
    const {boardId} = useParams();
    const [lists, setLists] = useState([]);
    const [isModalOpen, setModalState] = useState(false);
    const [listName, setListName] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isModalLoading, setModalLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchLists = async () => {
            if(!boardId) {
                setLoading(false);
                return;
            }
            const response = await getLists({boardId});
            console.log('lists', response);
            if(response.status === 'success') {
                setLists(response.data);
            }
            setLoading(false);
        }
        setTimeout(fetchLists, 1000);
    }, [boardId]);

    const handleListNameChange = (event) => {
        setListName(event.target.value);
    }
    const handleListNameSubmit = async (event) => {
        event.preventDefault();
        setModalLoading(true);
        setTimeout(async () => {
            const response = await createList({listName, boardId});
            console.log('resposne', response);
            if(response.status === 'success') {
                setLists([...lists, response.data]);
            }
            setModalLoading(false);
        }, 2000);
        closeModal();
    }
    const openModal = () => {
        setModalState(true);
    }
    const closeModal = () => {
        setModalState(false);
    }
    const handleDeleteList = async ({listId}) => {
        setLoading(true);
        setTimeout(async () => {
            const response = await deleteList({listId});
            if(response.status === 'success') {
                setLists(lists.filter(list => list.id !== listId));
            }
            setLoading(false);
        }, 2000);
    }
    return (
        <BoardContainer>
            <Link to="/dashboard">
                <CloseButton />
            </Link>
            <ListsContainer>
                { isLoading && <Loader size="large" /> }
                { !isLoading && lists.map(list => <List list={list} deleteList={handleDeleteList} key={list.id} />) }
            </ListsContainer>
            <AddButton onClick={openModal} />
            <Modal open={isModalOpen} onClose={closeModal} center>
                <h2>Create List</h2>
                { isModalLoading && <Loader size="large" /> }
                {
                    !isModalLoading &&
                    <form onSubmit={handleListNameSubmit}>
                        <label htmlFor="listname" />
                        <input type="text" name="listame" value={listName} onChange={handleListNameChange} placeholder="List name" />
                        <input type="submit" value="Submit" />
                    </form>
                }
            </Modal>
        </BoardContainer>
    )
};

export default withLoader(Board);
