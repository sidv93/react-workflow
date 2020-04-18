import express from 'express';
const router = express.Router();
import login from './auth';
import boardsApi from './boards';
import listsApi from './lists';
import cardsApi from './cards';

router.get('/', function (req, res) {
    res.send('Workflow home')
});

router.post('/login', login);

// Boards
router.get('/boards/:username', boardsApi.getBoards);
router.post('/board', boardsApi.createBoard);
router.delete('/board/:boardId', boardsApi.deleteBoard);

// Lists
router.get('/lists/:boardId', listsApi.getLists);
router.post('/list', listsApi.createList);
router.delete('/list/:listId', listsApi.deleteList);

// Cards
router.get('/cards/:listId', cardsApi.getCards);
router.post('/card', cardsApi.createCard);
router.delete('/card/:cardId', cardsApi.deleteCard);

export default router;
