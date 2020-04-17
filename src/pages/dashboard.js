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
    // const boards = [
    //     {
    //         boardName: 'board',
    //         date: new Date().toLocaleDateString(),
    //     },
    //     {
    //         boardName: 'board',
    //         date: new Date().toLocaleDateString(),
    //     },{
    //         boardName: 'board',
    //         date: new Date().toLocaleDateString(),
    //     },{
    //         boardName: 'board',
    //         date: new Date().toLocaleDateString(),
    //     },{
    //         boardName: 'board',
    //         date: new Date().toLocaleDateString(),
    //     },{
    //         boardName: 'board',
    //         date: new Date().toLocaleDateString(),
    //     },{
    //         boardName: 'board',
    //         date: new Date().toLocaleDateString(),
    //     },{
    //         boardName: 'board',
    //         date: new Date().toLocaleDateString(),
    //     },
    // ];
    const [ boards, setBoards ] = useState([]);
    useEffect(async () => {
        if(!username) {
            return;
        }
        const res = await fetch(`http://localhost:3000/boards?username=${username}`, {
            method: 'GET'
        });
        const response = await res.json();
        console.log('boards', response.data);
        if(response.status === 'success') {
            setBoards(response.data);
        }
    })
    const history = useHistory();
    const handleClick = (board) => {
        history.push(`/board/:${board}`);
    }
    return (
        <DashboardContainer>
            <BoardsContainer>
                {
                    boards.map((board,index) => {
                        const name = `${board.boardName}${index}`;
                        return <Board date={board.date} name={name} handleClick={handleClick} key={name} />
                    })
                }
            </BoardsContainer>
            <AddButton />
        </DashboardContainer>
    )
};

export default Dashboard;
