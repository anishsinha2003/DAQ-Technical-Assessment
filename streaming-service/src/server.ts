import net from 'net';
import { WebSocket, WebSocketServer } from 'ws';
import * as fs from 'fs';

const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });
let exceededCount = 0 
tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');
    
    socket.on('data', (msg) => {
        console.log(msg.toString());


        // HINT: what happens if the JSON in the received message is formatted incorrectly?
        // HINT: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        try {
            let currJSON = JSON.parse(msg.toString());
            if (currJSON["battery_temperature"] < 20 || currJSON["battery_temperature"] > 80) {
                exceededCount = exceededCount + 1
                if (exceededCount === 3) {
                    fs.appendFileSync('./incidents.log', String(Date.now()) + "\n");
                    exceededCount = 0
                }
            }
        } 
        catch (error) {
            console.log(msg.toString())
            console.error(error);
        }

        websocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(msg.toString());
            }
          });
    });

    socket.on('end', () => {
        console.log('Closing connection with the TCP client');
    });
    
    socket.on('error', (err) => {
        console.log('TCP client error: ', err);
    });
});

websocketServer.on('listening', () => console.log('Websocket server started'));

websocketServer.on('connection', async (ws: WebSocket) => {
    console.log('Frontend websocket client connected to websocket server');
    ws.on('error', console.error);  
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});


