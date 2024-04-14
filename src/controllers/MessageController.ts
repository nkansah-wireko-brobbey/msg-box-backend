import { Response, Request  } from "express";
import { MessageModel } from "../db/message";
import { MessageSchema } from "../utils/validations";

class MessageController{

    public async getAllmessage(request: Request, response: Response){

        try{
            const messages = await MessageModel.find();

            return response.status(200).json({data: messages});

        }catch(error){
            return response.status(400).json({status: false, error})
        }
         

    }
    public async getMessage(request: Request, response: Response){

        try{
            const {id} = request.params

            const messages = await MessageModel.findById(id);

            return response.status(200).json({data: messages});

        }catch(error){
            return response.status(400).json({status: false, error})
        }
         

    }
    public async createMessage(request: Request, response: Response){

        try{
            const {to,sender,body,subject} = request.body

            MessageSchema.parse({to,sender,body,subject});

            const message = new MessageModel({
                sender,
                to,
                subject,
                body,
                status: 1

            })

            await message.save()

            return response.status(200).json({message:'Message sent',data:message});

        }catch(error){

            return response.status(400).json({status: false, error})
        }
         

    }
    
}

export default new MessageController();