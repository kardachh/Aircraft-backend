const {Client} = require("pg");
const {sortAirports} = require("./handler");
const connectionString = "postgresql://postgres:@localhost:1111/AirCraftv3";

module.exports = {
    getAirports: async () => {
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
            return await getAirports()
        } catch (e) {
            return {type: "error", msg: "Ошибка при вылонении запроса: " + e, query: "getAirports"};
        }

    },

    getRoutes: async () => {
        try {
            const getRoutes = () => {
                const client = new Client({connectionString});
                const query = {
                    text: 'select * from bookings.routes',
                    rowMode: 'object'
                }
                client.connect();
                return client.query(query).then(rows => {
                    client.end();
                    return rows.rows;
                })
            }
            return await getRoutes();
        } catch (e) {
            return {type: "error", msg: "Ошибка при вылонении запроса: " + e};
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
                const query = {text:`select * from bookings.flights_v where ${whereQuery}`, rowMode:'object'}
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
