import db from './db';
import {v4 as uuid} from 'uuid';
import status from 'http-status';

const createList = (req, res) => {
    const { listName } = req.body;
    if(!listName) {
        
    }
};

const editList = (req, res) => {

};

const deleteList = (req, res) => {

};

export default {
    createList,
    editList,
    deleteList
}
