import express from 'express';
const router = express.Router();
import login from './auth';

router.get('/', function (req, res) {
    res.send('Workflow home')
});

router.post('/login', login);

export default router;
