import express from 'express'
import { getResource, getResources, uploadResource, deleteResource } from '../controllers/resourceController.js'
import multer from 'multer'
import { authMiddleware } from '../middleWares/auth.js'
import path from 'path'

export const resourceRoute = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/resources")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, '_'))
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'image/jpeg', 'image/png', 'image/gif',
        'video/mp4', 'video/x-matroska',
        'text/plain',
    ]
    if (allowed.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('File type not allowed'), false)
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } }) // 50MB limit

resourceRoute
    .get('/get', getResources)
    .get('/get/:id', getResource)
    .post('/upload', authMiddleware, upload.single('file'), uploadResource)
    .delete('/delete/:id', authMiddleware, deleteResource)
