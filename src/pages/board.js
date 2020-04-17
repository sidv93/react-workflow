import React from 'react';
import styled from 'styled-components';
import AddButton from '../components/AddButton';
import CloseButton from '../components/CloseButton';
import List from '../components/List';
import { useParams } from 'react-router-dom';

const BoardContainer = styled.div`
    max-width: 100vw;
    box-sizing: border-box;
`;

const Board = () => {
    const { boardName } = useParams();
    return (
        <BoardContainer>
            <CloseButton />
            <div style={{display: 'flex', flexWrap: 'wrap', margin: '50px', alignItems: 'center', justifyContent: 'center'}}>
                <List name="list1" />
                <List name="list1" />
                <List name="list1" />
                <List name="list1" />
                <List name="list1" />
            </div>
            <AddButton />
        </BoardContainer>
    )
};

export default Board;
