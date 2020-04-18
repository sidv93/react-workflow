import { v4 as uuid } from 'uuid';
import status from 'http-status';
import db from './db';

const createCard = (req, res) => {
    const { cardData, listId } = req.body;
    if(!cardData || !listId) {
        console.log('No card data or list id in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No cardData or list id in request'
        });
    }
    if(!db.get('lists').value().some(list => list.id === listId)) {
        console.log('List does not exist');
        res.status(status.NOT_FOUND);
        return res.json({
            status: 'error',
            message: 'Board does not exist'
        });
    }
    const newCard = {
        id: uuid(),
        listId,
        data: cardData,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    db.get('cards').push(newCard).write();
    console.log('Card created');
    res.status(status.OK);
    return res.json({
        status: 'success',
        data: newCard
    });
};

const getCards = (req, res) => {
    const { listId } = req.params;
    if(!listId) {
        console.log('No card id in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No card id in request'
        });
    }
    const cards = db.get('cards').filter({listId}).value();
    console.log(`${cards.length} cards found`);
    res.status(status.OK);
    return res.json({
        status: 'success',
        data: cards
    });
}

const editCard = (req, res) => {
    const { cardId } = req.params;
    const { cardData } = req.body;
    if(!cardId || !cardData) {
        console.log('No card id or data in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No card id or data in request'
        });
    }
    if(!db.get('cards').value().some(card => card.id === cardId)) {
        console.log('Card does not exist');
        res.status(status.NOT_FOUND);
        return res.json({
            status: 'error',
            message: 'Card does not exist'
        });
    }
    db.get('cards').find({id: cardId}).update({data: cardData, updatedAt: Date.now()}).write();
    console.log('Card edited');
    res.status(status.OK);
    return res.json({
        status: 'success',
        data: {cardId, cardData}
    });
};

const deleteCard = (req, res) => {
    const { cardId } = req.params;
    if(!cardId) {
        console.log('No card id in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No card id in request'
        });
    }
    if(!db.get('cards').value().some(card => card.id === cardId)) {
        console.log('Card does not exist');
        res.status(status.NOT_FOUND);
        return res.json({
            status: 'error',
            message: 'Card does not exist'
        });
    }
    db.get('cards').remove({id: cardId}).write();
    console.log('Card deleted');
    res.status(status.OK);
    return res.json({
        status: 'success',
        data: {cardId}
    });
};

export default {
    createCard,
    getCards,
    editCard,
    deleteCard
};
