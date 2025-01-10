const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

// Initialize a new instance of socket.io, passing the HTTP server object
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// Listen for incoming socket connections
io.on('connection', (socket) => {
    console.log('User connected');

    /**
     * SCENARIO 1 (Client-Server): 
     * Listening for the "chat message" event from the client. 
     * When a message is received, it will be logged and broadcast back to all clients.
     */
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

        /**
         * SCENARIO 1 (Server-Client): 
         * Broadcast the "chat message" event to all connected clients, including the sender.
         * 
         * If you want to exclude the sender, use `socket.broadcast.emit`.
         * Multiple arguments can be passed after the event name, e.g., `io.emit('event', arg1, arg2)`.
         */
        io.emit('chat message', msg);
    });

    /**
     * SCENARIO 2 (Client-Server): 
     * Listening for the "message with callback" event from the client. 
     * This event includes a callback function, which the server can invoke with data.
     */
    socket.on('message with callback', (arg1, arg2, callback) => {
        console.log(arg1); // Example: { foo: 'bar' }
        console.log(arg2); // Example: 'baz'
        
        // Invoke the callback function provided by the client with a response
        callback({
            status: 'ok'
        });

        /**
         * SCENARIO 2 (Server-Client): 
         * Emitting a "request" event to the client with a timeout. The client can respond by 
         * invoking the callback function, and the server will handle the acknowledgment or timeout.
         */
        socket.timeout(5000).emit('message with callback', { foo: 'bar' }, 'baz', (err, response) => {
            if (err) {
              // Handle case where the client did not acknowledge the event within 5 seconds
              console.error('Client did not respond in time.');
            } else {
              // Handle successful acknowledgment from the client
              console.log(response.status); // Example: 'ok'
            }
        });
    });

    // Handle the socket disconnection event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the HTTP server and listen for connections on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});