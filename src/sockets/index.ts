import { Server, Socket } from "socket.io";
import socketController from "../controllers/SocketController";

export default (io: Server) => {
    io.on('connection', async (socket: Socket) => {
        console.log('a user connected');
        console.log(socket.id);

        try{
            const userId = socket.handshake.query.userId as string;
            await socketController.saveSocketId(socket.id, userId);
        }catch(error){
            console.log(error)
        }

        socket.on('new_message', async (data) => {
            try {
                const receiver = await socketController.getUserBySocketId(data.receiver);
                if (receiver) {
                    io.to(receiver.socket).emit('new_message', data);
                }
            } catch (err) {
                console.error("Error sending message:", err);
            }
        });

        socket.on('disconnect', async () => {
            try {
                await socketController.removeSocketId(socket.id);
            } catch (err) {
                console.error("Error handling socket disconnect:", err);
            }
        });
    });
}

