import { BookSchema } from "../../models/books/booksModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllBooks = async(req,res) => {
    const  userId  = req.user;
    try {
        const books = await BookSchema.find({ userId});
        res.status(StatusCodes.OK).json({ message : 'books recieved', books : books});
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({message : error.message});
    }
}

export const addBook = async(req,res) => {
    const { name , author } = req.body;
    const userId = req.user;
    try {
        const book = new BookSchema({
            name : name,
            author : author,
            userId : userId
        });
        await book.save();
        res.status(StatusCodes.OK).json({message: 'added book', book : book});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}

export const updateBook = async(req,res) => {
    const { name , author } = req.body
    const { id } = req.params;
    const userId = req.user;
    try {
        const existingBook = await BookSchema.findOne({ _id : id});
        if(existingBook){
            const updatedBook = await BookSchema.updateOne({_id : id},{
                name : name,
                author : author,
                userId : userId
            });
            res.status(StatusCodes.OK).json({message : 'book updated', book: updateBook});
        }else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'book doesnt exits'})
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
        
    }
}

export const deleteBook = async(req,res) => {
    const { id } = req.params;
    try {
        const book = await BookSchema.findOne({ _id : id});
        if(book){
            await book.deleteOne();
            res.status(StatusCodes.OK).json({message: 'deleted book'});
        }else{
            res.status(StatusCodes.NOT_FOUND).json({ message : 'book not found'});
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : error.message});

    }
}