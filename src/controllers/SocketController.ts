import { UserModel } from "../db/user";

class SocketController {
    constructor() {}

    public async saveSocketId(socketId: string, userId: string): Promise<void> {
        try {
            const user = await UserModel.findById(userId);
            if (user) {
                user.socket = socketId;
                await user.save();
            }
        } catch (err) {
            console.error("Error saving socket ID:", err);
            throw err; 
        }
    }

    public async removeSocketId(socketId: string): Promise<void> {
        try {
            const user = await UserModel.findOne({ socket: socketId });
            if (user) {
                user.socket = '';
                await user.save();
            }
        } catch (err) {
            console.error("Error removing socket ID:", err);
            throw err; 
        }
    }

    public async getUserBySocketId(socketId: string): Promise<any> {
        try {
            return await UserModel.findOne({ socket: socketId });
        } catch (err) {
            console.error("Error getting user by socket ID:", err);
            throw err; 
        }
    }

    public async getSocketByUserId(userId: string): Promise<string | undefined | null> {
        try {
            const user = await UserModel.findById(userId);
            return user?.socket;
        } catch (err) {
            console.error("Error getting socket by user ID:", err);
            throw err; 
        }
    }
}

export default new SocketController();
