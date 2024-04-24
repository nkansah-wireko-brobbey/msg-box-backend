import { io } from "..";
import { IMessage } from "../models/common.model";
import socketController from "../controllers/SocketController";

class SocketEvents{

    public async sendNewMessage (data: any)  {
        try {
            console.log('Data:', data);
            const receiverSocket = await socketController.getSocketByUserId(data.to._id);
            console.log('Receiver:', receiverSocket);
            console.log('Data:', data.sender);
            if (receiverSocket) {
                if(!receiverSocket) return;
                
                io.to(receiverSocket).emit('new_message', data);
                console.log('Message via socket sent to:', receiverSocket);
            }else{
                console.log('User not found');
            }
        } catch (err) {
            console.error("Error sending message:", err);
        }
    }

}

export default new SocketEvents();