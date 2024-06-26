import express from 'express'
import UserController from '../controllers/UserController'
import { validateUser } from '../middlewares/authenticate'

export default (router: express.Router)=>{

    router.get('/user',validateUser, UserController.getAllUsers)
}