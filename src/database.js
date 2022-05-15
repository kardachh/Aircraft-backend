const {Client} = require("pg");
const {sortAirports} = require("./handler");
const connectionString = "postgresql://postgres:@localhost:1111/AirCraft";

module.exports = {
    getAirports: () => {
        try {
            const getAirports = async () => {
                const client = new Client({connectionString});
                const query = {text: 'SELECT * from bookings.airports', rowMode: 'object',}
                client.connect();
                return client.query(query).then(rows => {
                    client.end();
                    return sortAirports(rows.rows);
                })
            }
            return getAirports().then(res => res)
        } catch (e) {
            return {type: "error", msg: "Ошибка при вылонении запроса: " + e, query:"getAirports"};
        }

    },

    getRoutes: (req, res) => {
        const {airport} = req.query;
        if (airport) {
            const query = {
                text: 'select * from bookings.routes where departure_airport = $1::text or arrival_airport = $1::text ',
                values: [airport],
                rowMode: 'object'
            }
            pool.query(query).then(rows => {
                res.json(rows.rows)
            }).catch(err => {
                res.status(500).send({"error": err})
                console.log(err.stack)
            })
        } else {
            res.status(400).send({error: "Airport field is empty."})
        }
    },

    getFlightsByDate: async (date) => {
        try {
            if (date){
                const getFlightsByDate = async ()=>{
                    const client = new Client({connectionString});
                    const query = {text: 'select * from bookings.get_flights_at_day($1::timestamp)', values: [date], rowMode: 'object'}
                    client.connect();
                    return client.query(query).then(rows => {
                        client.end();
                        return rows.rows
                    })
                }
                return await getFlightsByDate()
            }
            else {
                console.log(data)
                return { type: "error", msg: "Пустые поля", query:"getFlightsByDate" };
            }
        } catch (e) {
            return {type: "error", msg: "Ошибка при вылонении запроса: " + e};
        }
    },

    getInfoFlight: (flight_id) => {
        try {
            if (flight_id) {
                const client = new Client({connectionString});
                const ids = flight_id.split(',')
                let whereQuery = ''
                ids.map((id, index) => {
                    index === 0 ? whereQuery += `flight_id = ${id} ` : whereQuery += `or flight_id = ${id} `
                })
                const query = {text:`select * from bookings.flights where ${whereQuery}`, rowMode:'object'}
                client.connect();
                return client.query(query).then(rows => {
                    client.end();
                    return rows.rows;
                })
            } else {
                console.log(flight_id)
                return { type: "error", msg: "Пустые поля", query:"getInfoFlight" };
            }
        } catch (e) {
            return {type: "error", msg: "Ошибка при вылонении запроса: " + e};
        }

    }
}
