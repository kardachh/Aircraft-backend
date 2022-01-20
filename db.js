import pg from "pg"

export const pool = new pg.Pool({
    user:"postgres",
    password:"",
    host:"localhost",
    port:"1111",
    database:"AirCraft"
})