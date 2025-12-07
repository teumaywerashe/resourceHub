import express from 'express'
import multer from 'multer'
import { addNew, getAllNews, getNew, getUniversityNews } from '../controllers/newsController.js'



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


newsRouter.get('/get', getAllNews).get('/get/:id', getUniversityNews).get('/find/:id', getNew).post('/add', upload.single('image'), addNew)