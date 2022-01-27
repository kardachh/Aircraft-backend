import express from "express";
import {router} from "./routes/aircraft.routes.js"
const PORT = process.env.port || 5000;
const app = express();

app.route('/book')
    .get(function (req, res) {
        res.send('Get a random book')
    })
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put(function (req, res) {
        res.send('Update the book')
    })

app.use('/api',router)

app.listen(PORT, () => console.log("server started on port " + PORT));
