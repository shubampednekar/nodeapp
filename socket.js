import { Server } from 'socket.io';
import http from 'http';
import {app} from './index.js';
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
    console.log('User is connected',socket.id);
    socket.on('disconnect', () => {
        console.log('User is disconnected',socket.id);
        
    });    
});