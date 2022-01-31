import express from "express";
import {Controller} from './controller.js'
const {api} = Controller();


export const Router = new express()

Router.get('/airports', (req, res)=>api.getAirports(req,res))
Router.get('/routes',(req,res)=>api.getRoute(req,res))
