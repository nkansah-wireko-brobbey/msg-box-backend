import express from 'express';

import authenticationRoutes from './Authentication';
import profileRoutes from './Profile'

const router = express.Router();

export default (): express.Router => {

   authenticationRoutes(router);
    profileRoutes(router);

    return router;
}