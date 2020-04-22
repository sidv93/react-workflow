import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from '../components/Board';
import AddButton from '../components/AddButton';
import { useHistory } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { withLoader } from '../common/utils';

const DashboardContainer = styled.div`
    max-width: 100vw;
    box-sizing: border-box;
`;

const BoardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 30px;
    align-items: center;
    justify-content: center;
`;

const Dashboard = ({username, Loader}) => {
    const [ boards, setBoards ] = useState([]);
    const [ isModalOpen, setModalState ] = useState(false);
    const [ boardName, setBoardName ] = useState('');
    let [ isLoading, setLoading ] = useState(false);
    const openModal = () => {
        setModalState(true);
    }
    const closeModal = () => {
        setModalState(false);
    }
    useEffect(() => {
        setLoading(true);
        const fetchBoards = async () => {
            if(!username) {
                setLoading(false);
                return;
            }
            const res = await fetch(`http://localhost:3000/boards/${username}`, {
                method: 'GET'
            });
            const response = await res.json();
            console.log('boards', response.data);
            if(response.status === 'success') {
                setBoards(response.data);
            }
            setLoading(false);
        }
        setTimeout(fetchBoards, 3000);
    }, [username])
    const history = useHistory();
    const handleClick = (boardId) => {
        history.push(`/board/${boardId}`);
    }
    const handleBoardNameChange = (event) => {
        setBoardName(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('boardname', boardName);
        closeModal();
    }
    return (
        <DashboardContainer>
            <BoardsContainer>
                {isLoading && <Loader />}
                {
                    boards.map((board,index) => {
                        return <Board board={board} handleClick={handleClick} key={board.id} />
                    })
                }
            </BoardsContainer>
            <AddButton onClick={openModal} />
            <Modal open={isModalOpen} onClose={closeModal} center>
                <h2>Create Board</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="boardName" />
                    <input type="text" name="boardName" value={boardName} onChange={handleBoardNameChange} placeholder="Board name" />
                    <input type="submit" value="Submit" />
                </form>
                
            </Modal>
        </DashboardContainer>
    )
};

export default withLoader(Dashboard);
