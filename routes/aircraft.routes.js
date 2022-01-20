import express from "express";
import {AircraftController} from '../controller/aircraft.controller.js'
const {api} = AircraftController();


const router = new express()
router.get('/aircrafts', (req,res)=>api.getAircrafts(req,res))


export {router}