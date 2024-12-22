import express from 'express';
import morgan from 'morgan';
import config from './config.js';
import connectDb from './dbConfig.js';
import  authRouter  from './routers/authRouter.js';
import booksRouter from './routers/books/booksRouter.js';
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
await connectDb();

app.get('/',(req,res) => {
    res.status(200).json({ message : 'api is running'});
})

app.use('/api/auth',authRouter);
app.use('/api/books',booksRouter);
const PORT = config.PORT;
app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`);
    
})