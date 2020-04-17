import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddButton from '../components/AddButton';
import CloseButton from '../components/CloseButton';
import List from '../components/List';
import { useParams } from 'react-router-dom';

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
    const { boardName } = useParams();
    const [ lists, setLists ] = useState([]);
    useEffect(async () => {
        if(!boardName) {
            return;
        }
        const res = await fetch(`http://localhost:3000/lists?boardName=${boardName}`, {
            method: 'GET'
        });
        const response = await res.json();
        console.log('lists', response.data);
        if(response.status === 'success') {
            setLists(response.data);
        }
    })
    return (
        <BoardContainer>
            <CloseButton />
            <ListsContainer>
                {
                    lists.map(list => <List name={list.name} key={list.name} />)
                }
            </ListsContainer>
            <AddButton />
        </BoardContainer>
    )
};

export default Board;
