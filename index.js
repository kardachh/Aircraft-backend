import express from "express";
import {router} from "./routes/aircraft.routes.js"
const PORT = process.env.port || 5000;
const app = express();

app.use('/api',router)

app.listen(PORT, () => console.log("server started on port " + PORT));
