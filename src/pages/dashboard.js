import React from 'react';
import styled from 'styled-components';
import Board from '../components/Board';
import AddButton from '../components/AddButton';

const DashboardContainer = styled.div`
    max-width: 100vw;
    box-sizing: border-box;
`;

const Dashboard = () => {
    const boards = [
        {
            boardName: 'board',
            date: new Date().toLocaleDateString(),
        },
        {
            boardName: 'board',
            date: new Date().toLocaleDateString(),
        },{
            boardName: 'board',
            date: new Date().toLocaleDateString(),
        },{
            boardName: 'board',
            date: new Date().toLocaleDateString(),
        },{
            boardName: 'board',
            date: new Date().toLocaleDateString(),
        },{
            boardName: 'board',
            date: new Date().toLocaleDateString(),
        },{
            boardName: 'board',
            date: new Date().toLocaleDateString(),
        },{
            boardName: 'board',
            date: new Date().toLocaleDateString(),
        },
    ];
    return (
        <DashboardContainer>
            <div style={{display: 'flex', flexWrap: 'wrap', margin: '30px', alignItems: 'center', justifyContent: 'center'}}>
                {
                    boards.map((board,index) => {
                        const name = `${board.boardName}${index}`;
                        return <Board date={board.date} name={name} key={name} />
                    })
                }
            </div>
            <AddButton />
        </DashboardContainer>
    )
};

export default Dashboard;
