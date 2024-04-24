import { Server, Socket } from "socket.io";
import socketController from "../controllers/SocketController";

export default (io: Server) => {
    io.on('connection', async (socket: Socket) => {
        console.log('a user connected');
        console.log(socket.id);

        io.emit('connected', socket.id);

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

