import express from 'express';

import AuthController from '../controllers/AuthController';
import { validateUser } from '../middlewares/authenticate';

export default(router: express.Router): express.Router => {
    router.post('/login', AuthController.login);
    router.post('/register', AuthController.register);
    router.post('/logout',validateUser, AuthController.logout);
    return router;
};
