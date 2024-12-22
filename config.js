import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path : path.resolve(`${process.cwd()}`,`.env.${process.env.NODE_ENV}`)
})
const config = {
    NODE_ENV : process.env.NODE_ENV || 'dev',
    PORT : process.env.PORT || 5000,
    MONGO_URI : process.env.MONGO_URI ,
    MONGODB_NAME : process.env.MONGO_DBNAME,
    JWT_SECRET : process.env.JWT_SECRET
}

export default config;