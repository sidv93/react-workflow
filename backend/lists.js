import db from './db';
import {v4 as uuid} from 'uuid';
import status from 'http-status';

const createList = (req, res) => {
    const { listName, boardId } = req.body;
    if(!listName || !boardId) {
        console.log('No list name or board id in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No list name or board id in request'
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
    const newList = {
        id: uuid(),
        boardId,
        name: listName,
        createdAt: Date.now()
    };
    db.get('lists').push(newList).write();
    console.log('List created');
    res.status(status.OK);
    return res.json({
        status: 'success',
        data: newList
    });
};

const getLists = (req, res) => {
    const { boardId } = req.params;
    if(!boardId) {
        console.log('No board id in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No board id in request'
        });
    }
    const lists = db.get('lists').filter({boardId}).value();
    console.log(`${lists.length} lists found`);
    res.status(status.OK);
    return res.json({
        status: 'success',
        data: lists
    });
}

const deleteList = (req, res) => {
    const { listId } = req.params;
    if(!listId) {
        console.log('No list id in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No list id in request'
        });
    }
    if(!db.get('lists').value().some(list => list.id === listId)) {
        console.log('List does not exist');
        res.status(status.NOT_FOUND);
        return res.json({
            status: 'error',
            message: 'List does not exist'
        });
    }
    db.get('lists').remove({id: listId}).write();
    console.log('List deleted');
    res.status(status.OK);
    return res.json({
        status: 'success',
        data: {listId}
    });
};

export default {
    createList,
    getLists,
    deleteList
}
