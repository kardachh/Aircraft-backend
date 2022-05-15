// import {pool} from "./database.js"
// import {sortAirports} from "./handler.js";
// export const Controller = () => {
//     const getAirports = (req, res) => {
//         const query = {
//             text: 'SELECT * from bookings.airports', rowMode: 'object',
//         }
//         pool.query(query).then(rows => {
//
//             res.json(sortAirports(rows.rows))
//         }).catch(err => {
//             res.status(500).send({"error": err})
//             console.log(err.stack)
//         })
//     }
//
//     const getRoutes = (req, res) => {
//         const {airport} = req.query;
//         if (airport) {
//             const query = {
//                 text: 'select * from bookings.routes where departure_airport = $1::text or arrival_airport = $1::text ',
//                 values: [airport],
//                 rowMode: 'object'
//             }
//             pool.query(query).then(rows => {
//                 res.json(rows.rows)
//             }).catch(err => {
//                 res.status(500).send({"error": err})
//                 console.log(err.stack)
//             })
//         } else {
//             res.status(400).send({error: "Airport field is empty."})
//         }
//     }
//
//     const getFlightsByDate = (req, res) => {
//         const {date} = req.query;
//         if (date) {
//             const query = {
//                 text: 'select * from bookings.get_flights_at_day($1::timestamp)', values: [date], rowMode: 'object'
//             }
//             pool.query(query).then(rows => {
//                 res.json(rows.rows)
//             }).catch(err => {
//                 res.status(500).send({"error": err})
//                 console.log(err.stack)
//             })
//         } else {
//             res.status(400).send({error: `Date field is empty.\n${JSON.stringify(req.query)}`})
//         }
//     }
//
//     const getInfoFlight = (req, res) => {
//         const {flight_id} = req.query;
//
//         if (flight_id) {
//             console.log(flight_id)
//             const ids = req.query.flight_id.split(',')
//             let whereQuery = ''
//             ids.map((id,index) => {
//                 index === 0 ? whereQuery += `flight_id = ${id} `:
//                 whereQuery += `or flight_id = ${id} `
//             })
//             const query = `select * from bookings.flights where ${whereQuery}`
//             console.log(query)
//             pool.query(query).then(rows => {
//                 res.json(rows.rows);
//             }).catch(err => {
//                 res.status(500).send({"error": err})
//                 console.log(err.stack)
//             });
//         } else {
//             res.status(400).send({error: `flight_id is empty.`})
//         }
//     }
//
//     return {
//         api: {getAirports, getRoutes, getFlightsByDate, getInfoFlight}
//     }
// }
// просмотр рейсов аэропорта на определенную дату
// select * from bookings.get_flights_at_day('2022-10-03')

const express = require("express");
const apiRouter = require("./api");
const router = express.Router();

router.use((req, res, next) => {
    console.log(req.method,req.path);
    next();
});

router.use("/api", apiRouter);

router.get("/", (req, res) => {
        res.json(req.method+' '+req.path)
});

module.exports = router;
