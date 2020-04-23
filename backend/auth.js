import db from './db';
import status from 'http-status';
import { v4 as uuid } from 'uuid';
import { add } from 'date-fns';

const login = (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        console.log('No username or password in request');
        res.status(status.BAD_REQUEST);
        return res.json({
            status: 'error',
            message: 'No username or password in request'
        });
    }
    const isValidAccount = db.get('accounts').value().some(account => account.username === username && account.password === password);
    console.log(isValidAccount);
    if(!isValidAccount) {
        res.status(status.NOT_FOUND);
        return res.json({
            status: 'failure',
            messgae: 'Invalid credentials'
        });
    }
    const response = {
        username,
        authToken: uuid(),
        validTill: add(new Date(), {hours: 1}).toISOString()
    }
    res.status(status.OK);
    return res.json({
        status: 'success',
        message: 'Authenticated',
        data: response
    });
}

export default login;
