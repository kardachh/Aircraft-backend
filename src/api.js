const express = require("express");
const {getAirports,getFlightsByDate,getInfoFlight,getRoutes} = require("./database");
const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    console.log("query", req.query);
    console.log("body", req.body);
    next();
});

apiRouter.get("/getAirports", async (req, res) => {
    const data = await getAirports();
    res.json(data)
});
apiRouter.get("/getFlightsByDate", async (req, res) => {
    const data = await getFlightsByDate(req.query['date']);
    res.json(data)
});
apiRouter.get("/getRoutes", async (req, res) => {
    const data = await getRoutes();
    res.json(data)
});
apiRouter.get("/getInfoFlight", async (req, res) => {
    const data = await getInfoFlight(req.query['flight_id']);
    res.json(data)
});

module.exports = apiRouter
