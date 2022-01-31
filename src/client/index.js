import {io} from "socket.io-client"

const socket = io("http://localhost:9000")

socket.on("hello",arg =>{
    console.log(arg)
})
