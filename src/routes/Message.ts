import express from 'express';
import messageController from '../controllers/MessageController'
import { validateUser } from '../middlewares/authenticate';

export default(router: express.Router): express.Router =>{

    router.get('/message', validateUser, messageController.getAllMessage)
    router.get('/message/:id',validateUser, messageController.getMessage)
    router.patch('/message/:id',validateUser, messageController.readMessage)
    router.post('/message', validateUser, messageController.createMessage)
    router.delete('/message/:id', validateUser, messageController.deleteMessage);

    return router;
}