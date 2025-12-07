const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("chatMessage", (msg) => {
        console.log("Message:", msg);

        // Sends message to all OTHER clients
        socket.broadcast.emit("chatMessage", msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

server.listen(port, () => {
    console.log('Server is running');
});
