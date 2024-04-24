import { Server, Socket } from "socket.io";
import socketController from "../controllers/SocketController";
import { IMessage } from "../models/common.model";

export default (io: Server) => {
    io.on('connection', async (socket: Socket) => {
        console.log('a user connected');
        console.log(socket.id);

        io.to(socket.id).emit('connected', socket.id);

        socket.on('save_userId', async (userId) => {
            try {
                if (!userId) {
                    throw new Error("User ID is required to connect socket");
                }
                await socketController.saveSocketId(socket.id, userId);
                console.log('Socket connected:', userId);
            } catch (err) {
                console.error("Error handling socket connection:", err);
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

