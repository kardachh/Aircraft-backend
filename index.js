import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import {Router} from "./src/routes.js";
import Settings from "./settings.js";
import {checkFlights} from "./src/handler.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

let flights = [];

const getVisitors = async () => {
    let clients = await io.fetchSockets().then((socket) => socket)
    clients = clients.map((client) => client.id)
    return clients
}

io.on("connection", async (socket) => {

    console.log(await getVisitors())
    socket.join("some room");

    let flightsCheckInterval = setInterval(async () => {
        await checkFlights(flights).then((res) => {
            if (res.info) {
                flights = res.value
                socket.emit('flights', flights)
            }
        })
    }, 3000)

    socket.on('disconnect', () => {
        console.log("disconnect")
        if (getVisitors() < 1) {
            setTimeout(() => {
                clearInterval(flightsCheckInterval);
                console.log(`stop interval`);
            }, 1000);
        }
    })

    socket.on("switch",(arg)=>{
        console.log(arg)
        io.to("some room").emit('switchFromServer',JSON.stringify(`"responseFromServer":${arg}`))
    })



});

app.use(Settings.API_PATH, Router)

httpServer.listen(Settings.MAIN_PORT);
