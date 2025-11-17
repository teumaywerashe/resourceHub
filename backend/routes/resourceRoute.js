import express from 'express'
import { getResource, getResources, uploadResource } from '../controllers/resourceController.js'
import multer from 'multer'

export const resourceRoute = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/resources")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })

resourceRoute.get('/get', getResources).get('/get/:id', getResource).post('/upload', upload.single('file'), uploadResource)