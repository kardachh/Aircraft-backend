import {pool} from "./db.js"

export const Controller = () => {
    const getAirports = (req, res) => {
        const query = {
            text: 'SELECT * from bookings.airports',
            rowMode: 'object',
        }
        pool.query(query).then(rows => {
            res.json(rows.rows)
        }).catch(err => {
            res.status(500).send({"error": err})
            console.log(err.stack)
        })
    }

    const getRoutes = (req, res) => {
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
        }
        else{
            res.status(400).send({error:"Airport field is empty."})
        }
    }

    const getFlightsByDate=(req,res)=>{
        const {date} = req.query;
        if (date){
            const query = {
                text: 'select * from bookings.get_flights_at_day($1::timestamp)',
                values: [date],
                rowMode: 'object'
            }
            pool.query(query).then(rows => {
                res.json(rows.rows)
            }).catch(err => {
                res.status(500).send({"error": err})
                console.log(err.stack)
            })
        }
        else{
            res.status(400).send({error:"Date field is empty."})
        }
    }

    return {
        api: {getAirports, getRoutes,getFlightsByDate}
    }
}
// просмотр рейсов аэропорта на определенную дату
// select * from bookings.get_flights_at_day('2022-10-03')



// пример запроса к БД
// const query = {
//     text: 'SELECT $1::text as first_name, select $2::text as last_name',
//     values: ['Brian', 'Carlson'],
//     rowMode: 'array',
// }
// // callback
// client.query(query, (err, res) => {
//     if (err) {
//         console.log(err.stack)
//     } else {
//         console.log(res.fields.map(field => field.name)) // ['first_name', 'last_name']
//         console.log(res.rows[0]) // ['Brian', 'Carlson']
//     }
// })
// // promise
// client
//     .query(query)
//     .then(res => {
//         console.log(res.fields.map(field => field.name)) // ['first_name', 'last_name']
//         console.log(res.rows[0]) // ['Brian', 'Carlson']
//     })
//     .catch(e => console.error(e.stack))
