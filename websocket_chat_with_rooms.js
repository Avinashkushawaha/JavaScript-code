const WebSocket = require('ws');
const http = require('http');
const { type } = require('os');
const { timeStamp } = require('console');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const rooms = new Map();

wss.on('connection', (ws) => {
    let currentRoom = null;
    let username = null;

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'join') {
            if (currentRoom) {
                leaveRoom(currentRoom, ws);
            }

            currentRoom = data.room;
            username = data.username;
            joinRoom(currentRoom, ws, username);
        }
         else if (data.type === 'message' && currentRoom) {
            BroadcastToRoom(currentRoom, {
                type: 'message',
                username,
                text: data.text,
                timeStamp: new Date().toISOString()
            });
         }

    });
    ws.on('close', () =>{
        if (currentRoom) {
            leaveRoom(currentRoom, vs);
        }
    });
});

function joinRoom(roomName, ws, username) {
    if (!rooms.has(roomName)) {
       rooms.set(roomName, new Set());
    }

    const room = rooms.get(roomName);
    room.add(ws);

    BroadcastToRoom(roomName, {
        type: 'notification',
        text: `${username} joined the room`
    });

    ws.send(JSON.stringify({
        type: 'roomInfo',
        users: Array.from(room).length
    }));
}

function leaveRoom(roomName, ws) {
    const room = rooms.get(roomName);
    if (room) {
        room.delete(ws);

    if (room.size === 0) {
        rooms.delete(roomName);
    }    else{
        broadcastToRoom(roomName, {
            type: 'notification',
            text: 'A user left the room'
        });
    }

    }
}

function broadcastToRoom(roomName, message) {
    const room = rooms.get(roomName);
    if (room) {
        const messageStr = JSON.stringify(message);
        room.forEach(client =>{
            if (client.readyState === WebSocket.OPEN){
                client.send(messageStr);
            }
        });
    }
}

server.listen(8080, () => {
    console.log('Chat server running on ws://localhost:8080');
})

