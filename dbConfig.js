import mongoose from 'mongoose';
import {config} from './config.js';
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI,{
            dbName : config.MONGODB_NAME || 'dev'
            });
            console.log('mongodb connected');
        }
    catch (error) {
        console.log(`error in mongodb connection ${error.message}`);
        
    }
}

export default connectDb;