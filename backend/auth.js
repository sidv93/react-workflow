import db from './db';
import status from 'http-status';

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
    res.status(isValidAccount ? status.OK : status.NOT_FOUND);
    return res.json({
        status: isValidAccount ? 'success' : 'error',
        message: isValidAccount ? 'Authenticated' : 'Invalid credentials'
    });
}

export default login;