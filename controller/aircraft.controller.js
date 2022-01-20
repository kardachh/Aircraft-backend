import {pool} from "../db.js"
export const AircraftController = ()=>{
    const getAircrafts = async (req, res) => {
        console.log("getAircrafts")
        const aircrafts = await pool.query('select * from bookings.aircrafts');
        res.json(aircrafts.rows)
    }
    const getOneAircraft = (req,res)=>{

    }
    return {
        api:{getAircrafts,getOneAircraft}
    }
}