import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from '../components/Board';
import AddButton from '../components/AddButton';
import { useHistory } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { withLoader, getBoards } from '../common/utils';
import authStore from '../common/authstore';
import { createBoard, deleteBoard } from '../common/utils';

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

const Dashboard = ({Loader}) => {
    const [ boards, setBoards ] = useState([]);
    const [ isModalOpen, setModalState ] = useState(false);
    const [ boardName, setBoardName ] = useState('');
    const [ isLoading, setLoading ] = useState(false);
    const [isModalLoader, setModalLoader] = useState(false);
    const username = authStore.userDetails.username;
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
            const response = await getBoards({username});
            console.log('boards', response);
            if(response.status === 'success') {
                setBoards(response.data);
            }
            setLoading(false);
        }
        setTimeout(fetchBoards, 2000);
    }, [username])
    const history = useHistory();
    const handleClick = (boardId) => {
        history.push(`/board/${boardId}`);
    }
    const handleBoardNameChange = (event) => {
        setBoardName(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setModalLoader(true);
        const response = await createBoard({boardName});
        setModalLoader(false);
        if(response.status === 'success') {
            setBoards([...boards,response.data]);
        } 
        closeModal();
    };
    const handleDeleteBoard = async ({boardId}) => {
        setLoading(true);
        const response =  await deleteBoard({boardId});
        if(response.status === 'success') {
            
            setBoards(boards.filter(board => board.id !== boardId));
        }
        setLoading(false);
    }
    return (
        <DashboardContainer>
            <BoardsContainer>
                {isLoading && <Loader size="large" />}
                {!isLoading &&
                    boards.map(board => {
                        return <Board board={board} handleClick={handleClick} handleDelete={handleDeleteBoard} key={board.id} />
                    })
                }
            </BoardsContainer>
            <AddButton onClick={openModal} />
            <Modal open={isModalOpen} onClose={closeModal} center>
                <h2>Create Board</h2>
                {
                    isModalLoader && <Loader size="medium" />
                }
                {
                    !isModalLoader && <form onSubmit={handleSubmit}>
                        <label htmlFor="boardName" />
                        <input type="text" name="boardName" value={boardName} onChange={handleBoardNameChange} placeholder="Board name" />
                        <input type="submit" value="Submit" />
                    </form>
                }
                
                
            </Modal>
        </DashboardContainer>
    )
};

export default withLoader(Dashboard);
