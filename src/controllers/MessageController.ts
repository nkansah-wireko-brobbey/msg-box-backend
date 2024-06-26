import { Response, Request  } from "express";
import { MessageModel } from "../db/message";
import { MessageSchema, validateEmail } from "../utils/validations";
import socketEvnets from "../sockets/Events.sockets";
import { IMessage, IRequest } from "../models/common.model";
import { UserModel } from "../db/user";

class MessageController{

    public async getAllMessage(request: IRequest, response: Response){

        try{

            const {user} = request;

            const sentMessages = await MessageModel.find({sender: user?._id}).populate('sender','_id name email').populate('to', '_id name email');

            const receivedMessages = await MessageModel.find({to: user?._id}).populate('sender','_id name email').populate('to', '_id name email');

            const messages = [...sentMessages, ...receivedMessages];

            console.log(messages)

            const uniqueMessages = messages.filter((message, index, self) =>{
               return index === self.findIndex((t) => (t._id.toString() === message._id.toString()))
            })


            return response.status(200).json({data: uniqueMessages});

        }catch(error){
            return response.status(400).json({status: false, error})
        }
         

    }
    public async getAllSentMessages(request: IRequest, response: Response){

        try{

            const {user} = request;

            const sentMessages = await MessageModel.find({sender: user?._id}).populate('sender','_id name email').populate('to', '_id name email');

            const messages = [...sentMessages];

            return response.status(200).json({data: messages});

        }catch(error){
            return response.status(400).json({status: false, error})
        }
         

    }
    public async getAllReceivedMessages(request: IRequest, response: Response){

        try{

            const {user} = request;

            const receivedMessages = await MessageModel.find({to: user?._id}).populate('sender','_id name email').populate('to', '_id name email');

            const messages = [...receivedMessages];

            return response.status(200).json({data: messages});

        }catch(error){
            return response.status(400).json({status: false, error})
        }
         

    }
    public async getMessage(request: Request, response: Response){

        try{
            const {id} = request.params

            const messages = await MessageModel.findById(id).populate('sender','_id name email').populate('to', '_id name email');

            return response.status(200).json({data: messages});

        }catch(error){
            return response.status(400).json({status: false, error})
        }
         

    }
    public async createMessage(request: Request, response: Response){

        try{
            let {to,sender,body,subject} = request.body
            
            MessageSchema.parse({to,sender,body,subject});
        
            if(validateEmail(to)){
            const toUser = await UserModel.findOne({email: to})
            if(toUser)
                to = toUser._id;
            }

            const message = new MessageModel({
                sender,
                to,
                subject,
                body,
                status: 1

            })

            await message.save();

            const newMessage = await MessageModel.findById(message._id)
            .populate('sender', '_id name email')
            .populate('to', '_id name email');



            socketEvnets.sendNewMessage(newMessage);
            

            return response.status(201).json({message:'Message sent',data:message});

        }catch(error){

            return response.status(400).json({status: false, error})
        }
         

    }

    public async readMessage(request: Request, response: Response){
        try{
            const {id} = request.params;

            const message = await MessageModel.findById(id)

            if(!message){
                throw Error("No data found")
            }

            message.status = 2;

            await message.save();

            return response.status(200)
            .json({message:  'Message updated to read', data: message})

        }catch(error){

            return response.status(400).json({status: false, error})

        }
    }
    public async deleteMessage(request: Request, response: Response){
        try{
            const {id} = request.params;

            const message = await MessageModel.findById(id)

            if(!message){
                throw Error("No data found")
            }

            message.status = 3;

            await message.save();

            return response.status(200)
            .json({message:  'Message deleted', data: message})

        }catch(error){

            return response.status(400).json({status: false, error})

        }
    }
    
}

export default new MessageController();