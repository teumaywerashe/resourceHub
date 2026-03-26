import express from 'express'
import multer from 'multer'
import { addNew, deleteNew, getAllNews, getNew, getUniversityNews } from '../controllers/newsController.js'
import fs from 'fs'

const newsUploadsDir = "uploads/news";
if (!fs.existsSync(newsUploadsDir)) {
    fs.mkdirSync(newsUploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, newsUploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage })

export const newsRouter = express.Router()

newsRouter
    .get('/get', getAllNews)
    .get('/get/:id', getUniversityNews)
    .get('/find/:id', getNew)
    .post('/add', upload.single('image'), addNew)
    .delete('/delete/:id', deleteNew)