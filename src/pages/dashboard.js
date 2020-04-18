import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from '../components/Board';
import AddButton from '../components/AddButton';
import { useHistory } from 'react-router-dom';

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

const Dashboard = ({username}) => {
    const [ boards, setBoards ] = useState([]);
    useEffect(() => {
        const fetchBoards = async () => {
            if(!username) {
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
        }
        fetchBoards();
    }, [])
    const history = useHistory();
    const handleClick = (boardId) => {
        history.push(`/board/${boardId}`);
    }
    return (
        <DashboardContainer>
            <BoardsContainer>
                {
                    boards.map((board,index) => {
                        return <Board board={board} handleClick={handleClick} key={board.id} />
                    })
                }
            </BoardsContainer>
            <AddButton />
        </DashboardContainer>
    )
};

export default Dashboard;
