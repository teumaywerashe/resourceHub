import express from 'express'
import multer from 'multer'
import { addNew, getNew, getNews } from '../controllers/newsController.js'



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/news");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage })

export const newsRouter = express.Router()


newsRouter.get('/get', getNews).get('/find/:id', getNew).post('/add', upload.single('image'), addNew)