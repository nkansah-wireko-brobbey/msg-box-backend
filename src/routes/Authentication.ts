import express from 'express';

import AuthController from '../controllers/AuthController';
import { validateUser } from '../middlewares/authenticate';

export default(router: express.Router): express.Router => {
    router.post('/auth/login', AuthController.login);
    router.post('/auth/register', AuthController.register);
    router.get('/auth/logout',validateUser, AuthController.logout);
    return router;
};
