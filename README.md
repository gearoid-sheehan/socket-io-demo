# socket-io-demo

Implementing the Socket.io package according to the documentation found at https://socket.io/docs/v4/

What is Socket.IO?
Socket.IO was created in 2010. It was developed to use open connections to facilitate realtime communication, still a relatively new phenomenon at the time.

Socket.IO allows bi-directional communication between client and server. Bi-directional communications are enabled when a client has Socket.IO in the browser, and a server has also integrated the Socket.IO package. While data can be sent in a number of forms, JSON is the simplest.

To establish the connection, and to exchange data between client and server, Socket.IO uses Engine.IO. This is a lower-level implementation used under the hood. Engine.IO is used for the server implementation and Engine.IO-client is used for the client.

Socket.IO brings to mind web sockets. Web sockets are also a browser implementation allowing bi-directional communication, however, Socket.IO does not use this as standard. First, Socket.IO creates a long-polling connection using XHR-polling. Then, once this is established, it upgrades to the best connection method available. In most cases, this will result in a WebSocket connection.
