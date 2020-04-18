import db from './db';
import status from 'http-status';
import { v4 as uuid } from 'uuid';

const createBoard = (req, res) => {
    const { boardName, username } = req.body;
    if(!boardName || !username) {
        console.log('No board name or username in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No board name or username in request'
        });
    }
    if(db.get('boards').value().some(board => board.name === boardName)) {
        console.log(`Board with name ${boardName} already exists`);
        res.status(status.CONFLICT);
        return res.json({
            status: 'error',
            message: 'Board already exists'
        })
    }
    const newBoard = {
        id: uuid(),
        name: boardName,
        createdAt: new Date().toLocaleDateString(),
        username
    };

    db.get('boards').push(newBoard).write();
    console.log('Board created', newBoard);
    res.status(status.OK);
    return res.json({
        status: 'success',
        data: newBoard
    });
};

const deleteBoard = (req, res) => {
    const { boardId } = req.params;
    if(!boardId) {
        console.log('No board id in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No board id in request'
        });
    }
    if(!db.get('boards').value().some(board => board.id === boardId)) {
        console.log('Board does not exist');
        res.status(status.NOT_FOUND);
        return res.json({
            status: 'error',
            message: 'Board does not exist'
        });
    }
    db.get('boards').value().filter(board => board.id !== boardId).write();
    console.log('Board deleted');
    res.status(status.OK);
    return res.json({
        status: 'success',
        data: {boardId}
    });
};

export default {
    createBoard,
    deleteBoard
};
