import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddButton from '../components/AddButton';
import CloseButton from '../components/CloseButton';
import List from '../components/List';
import { useParams } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';

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

const Board = () => {
    const { boardId } = useParams();
    const [ lists, setLists ] = useState([]);
    const [ isModalOpen, setModalState ] = useState(false);
    const [ listName, setListName ] = useState('');
    useEffect(() => {
        const fetchLists = async () => {
            if(!boardId) {
                return;
            }
            const res = await fetch(`http://localhost:3000/lists/${boardId}`, {
                method: 'GET'
            });
            const response = await res.json();
            console.log('lists', response.data);
            if(response.status === 'success') {
                setLists(response.data);
            }
        }
        fetchLists();
    }, [boardId]);

    const handleListNameChange = (event) => {
        setListName(event.target.value);
    }
    const handleListNameSubmit = (event) => {
        event.preventDefault();
        console.log('listname', listName);
        closeModal();
    }
    const openModal = () => {
        setModalState(true);
    }
    const closeModal = () => {
        setModalState(false);
    }
    return (
        <BoardContainer>
            <CloseButton />
            <ListsContainer>
                {
                    lists.map(list => <List list={list} key={list.id} />)
                }
            </ListsContainer>
            <AddButton onClick={openModal} />
            <Modal open={isModalOpen} onClose={closeModal} center>
                <h2>Create List</h2>
                <form onSubmit={handleListNameSubmit}>
                    <label htmlFor="listname" />
                    <input type="text" name="listame" value={listName} onChange={handleListNameChange} placeholder="List name" />
                    <input type="submit" value="Submit" />
                </form>
            </Modal>
        </BoardContainer>
    )
};

export default Board;
