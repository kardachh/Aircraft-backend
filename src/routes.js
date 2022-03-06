import express from "express";
import {Controller} from './controller.js'
import Settings from "../settings.js";

const {api} = Controller();

export const Router = new express()

Router.get(Settings.ROUTES.FLIGHTS,(req,res)=>api.getFlightsByDate(req,res))
Router.get(Settings.ROUTES.AIRPORTS, (req, res)=>api.getAirports(req,res))
Router.get(Settings.ROUTES.ROUTES,(req,res)=>api.getRoutes(req,res))
