const express = require("express");
const controller = require("./src/controller");
const { urlencoded } = require("express");

const app = express();
const port = 3000;
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(controller);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
