import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'

export const userRouter = express.Router()
userRouter.route('/login').post(loginUser)
userRouter.route('/register').post(registerUser)