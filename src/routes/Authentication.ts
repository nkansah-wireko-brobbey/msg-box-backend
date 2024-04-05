import express from 'express';

import AuthController from '../controllers/AuthController';

export default(router: express.Router): express.Router => {
    router.post('/login', AuthController.login);
    router.post('/register', AuthController.register);
    router.post('/logout', AuthController.logout);
    return router;
};
