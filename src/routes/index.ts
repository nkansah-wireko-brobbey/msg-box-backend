import express from 'express';

import authenticationRoutes from './Authentication';
import profileRoutes from './Profile'
import messageRoutes from './Message'
import userRoutes from './User'

const router = express.Router();

export default (): express.Router => {

    authenticationRoutes(router);
    profileRoutes(router);
    messageRoutes(router)
    userRoutes(router)


    return router;
}