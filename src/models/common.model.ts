import { Request } from "express";

export interface IUser{
    _id: string;
    name: string;
    email: string;
    token?: string;
    
}

export interface IRequest extends Request{

    user?: IUser

}

export interface IMessage{
    _id: string;
    sender: string;
    receiver: string;
    message: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISocketData{
    data: IMessage;
    receiver: string;
}