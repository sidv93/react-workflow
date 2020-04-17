import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import db from './db';
import router from './routes';

const app = express();

app.set('port', 3000);
app.use(compression()); // Compress all responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static pages and assets

// Add new user if user sid does not exist
if(!db.get('accounts').value().some(item => item.username === 'sid')) {
    db.get('accounts').push({username: 'sid', password: '123'}).write();
}

app.use(router);

export default app;
