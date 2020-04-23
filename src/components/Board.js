import React from 'react';
import styled from 'styled-components';

const BoardComponent = styled.div`
    box-shadow: -1px 1px 7px 1px rgba(161,153,161,0.75);
    min-width: 350px;
    margin: 20px;
`;

const BoardHeader = styled.div`
    background-color: #f0f0f0;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`;

const BoardBody = styled.div`
    background-color: #f8f8f8;
    padding: 10px;
    cursor: pointer;
    font-size: 1rem;
`;

const Board = ({board, handleClick, handleDelete}) => {
    return (
        <BoardComponent>
            <BoardHeader>
                <span>{new Date(board.createdAt).toLocaleDateString()}</span>
                <span style={{cursor: 'pointer'}} onClick={() => handleDelete({boardId: board.id})} >
                    <i className="fa fa-times" />
                </span>
            </BoardHeader>
            <BoardBody onClick={() => handleClick(board.id)}>
                <p>{board.name}</p>
            </BoardBody>
        </BoardComponent>
    )
};

export default Board;
