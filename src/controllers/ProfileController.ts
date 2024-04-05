import express from 'express'
import { IRequest } from '../models/common.model'
import { UserModel } from '../db/user';

export const profileController = async (request: IRequest, response: express.Response) =>{

    try{

        const email = request.user?.email;
        const user = await UserModel.findOne({
            email
        });

        return response.status(201).json({data: user});

    }catch(error){
        return response.status(400).json({status: false, message: error});
    }

}