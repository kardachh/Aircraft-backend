import {io} from "socket.io-client"
import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';

const socket = io("http://localhost:5000").disconnect()

const rl = readline.createInterface({input, output});
while (rl) {
    const answer = await rl.question('do? ');
    switch (answer) {
        case 'c':
            if (!socket.connected) {
                socket.connect()
                socket.on("connect", () => {
                    console.log(socket.id)
                });

                socket.on("flights", arg => {
                    // console.log(arg)
                });

                socket.on('switchFromServer',arg=>{
                    console.log(arg)
                })

            } else console.log('already connected')

            break;
        case 'd':
            if (socket.connected) {
                console.log('disconnect')
                socket.close()
                socket.disconnect();
            } else console.log('already disconnected');
            break
        case 'i':
            if (socket.connected) {
                console.log(socket)
            } else console.log('connect first');
            break;
        case 's':
            socket.emit('switch',{"switch" : "test"})
    }
}

rl.close();
