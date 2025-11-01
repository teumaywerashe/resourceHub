import express from "express"
import { getAllCampus, getCampus } from "../controllers/campusController.js"

export const campusRouter = express.Router()

campusRouter.route('/get').get(getAllCampus)
campusRouter.route('/find/:id').get(getCampus)