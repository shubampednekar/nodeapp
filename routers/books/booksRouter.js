import express from 'express';
import isAuthenticated from './../../middleware/login.js';
import { getAllBooks, addBook, updateBook, deleteBook  } from '../../controllers/books/booksController.js';
const booksRouter = express.Router();

booksRouter.get('/',isAuthenticated,getAllBooks);
booksRouter.post('/',isAuthenticated,addBook);
booksRouter.put('/:id',isAuthenticated,updateBook);
booksRouter.delete('/:id',isAuthenticated,deleteBook);

export default booksRouter;