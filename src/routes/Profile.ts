import express from 'express'

import { profileController } from '../controllers/ProfileController'
import { validateUser } from '../middlewares/authenticate'

export default (router: express.Router)=>{

    router.get('/profile',validateUser, profileController);
}