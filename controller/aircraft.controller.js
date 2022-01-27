import {pool} from "../db.js"
export const AircraftController = ()=>{
    const getAircrafts = async (req, res) => {
        try {
            const {code} = req.query
            if (code){
                console.log(`${Date.now()} – getOneAircrafts: code = ${code}`)
                const query = `select * from bookings.aircrafts where aircraft_code = '${code}'`;
                pool.query(query)
                    .then(rows => res.json(rows));
            }
            else {
                console.log(`${Date.now()} – getOneAircrafts`)
                const query = `select * from bookings.aircrafts`
                pool.query(query)
                    .then(rows => res.json(rows.rows));
            }
        }
        catch (err){
            console.log("ERROR")
            console.log(`${Date.now()} – ${err}`)
            res.status(500).send('Something broke!');
        }
    }
    return {
        api:{getAircrafts}
    }
}
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
