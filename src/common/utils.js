import React from 'react';
import authStore from './authstore';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

let boardName = '';
export const withLoader = Component => {
    const sizes = {
        small: '24px',
        medium: '48px',
        large: '72px'
    };
    const loader = ({size}) => <i style={{fontSize: sizes[size]}} className="fa fa-spinner fa-spin" />;
    return props => <Component Loader={loader} {...props} />;
};

export const setBoard = (boardname) => {
    console.log(`setting board`, boardname);
    boardName = boardname;
}

export const Headerwithtext = () => {
    const location = useLocation();
    console.log('location', location);
    let text;
    if(location.pathname.includes('dashboard')) {
        text = `Welcome to workflow, ${authStore.userDetails.username}`;
    } else if(location.pathname.includes('board')) {
        console.log('boardname', boardName);
        text = `${boardName}`;
    } else {
        text = 'Welcome to Workflow';
    }
    return <Header text={text} />
}

export const getBoards = async ({username}) => {
    const res = await fetch(`http://localhost:3000/boards/${username}`, {
        method: 'GET'
    });
    return await res.json();
}

export const createBoard = async ({boardName}) => {
    console.log('board', boardName);
    console.log('user', authStore.userDetails.username);
    const { username } = authStore.userDetails;
    const res = await fetch('http://localhost:3000/board', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({boardName, username})
    });
    return await res.json();
}

export const deleteBoard = async ({boardId}) => {
    console.log('boardId', boardId);
    const res = await fetch(`http://localhost:3000/board/${boardId}`, {
        method: 'DELETE',
    });
    return await res.json();
}

export const getLists = async ({boardId}) => {
    const res = await fetch(`http://localhost:3000/lists/${boardId}`, {
        method: 'GET'
    });
    return await res.json();
}

export const createList = async ({listName, boardId}) => {
    const res = await fetch('http://localhost:3000/list', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({boardId, listName})
    });
    return await res.json();
}

export const deleteList = async ({listId}) => {
    const res = await fetch(`http://localhost:3000/list/${listId}`, {
        method: 'DELETE',
    });
    return await res.json();
}

export const getCards = async ({listId}) => {
    const res = await fetch(`http://localhost:3000/cards/${listId}`, {
        method: 'GET'
    });
    return await res.json();
}

export const createCard = async ({listId, cardData}) => {
    const res = await fetch('http://localhost:3000/card', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({listId, cardData})
    });
    return await res.json();
}

export const deleteCard = async ({cardId}) => {
    const res = await fetch(`http://localhost:3000/card/${cardId}`, {
        method: 'DELETE',
    });
    return await res.json();
}

export default { withLoader };
