import {sign, verify} from 'jsonwebtoken';
import { IUser } from '../models/common.model';
import express from 'express';
import { UserModel } from '../db/user';
import { merge } from 'lodash';

const SECRET_KEY = '101416afad109708fd4c20a4464a08ac84c7891da432b6074451f2d4477b2cda'

export const generateToken =(data:IUser) => {

    const token = sign(data,SECRET_KEY,{expiresIn: '1 day'})

    return token; 
}


export const validateUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    const authorization = request.headers.authorization;

    if(!authorization){
        return response.status(401).json({status: false, message: "Unauthorized"});
    }
   
    try{

        const splittedToken = authorization.split(' ');

        if(splittedToken.length !== 2){
            return response.status(401).json({status: false, message: "Unauthorized In valid token"});
        }

        const token = splittedToken[1];

        const user:IUser = verify(token, SECRET_KEY) as IUser;

        if(!user){
            return response.status(401).json({status: false, message: "Unauthorized Invalid token"});
        }

        const isValidToken = await isTokenValid(token, user.email);

        if(!isValidToken){
            return response.status(401).json({status: false, message: "Unauthorized Invalid token"});
        }

        merge(request, {user});
        return next();

    }catch(error){
        return response.status(401).json({status: false, error});
    }
}

const isTokenValid =  async (token: string, email: string) => {
    try{
        const user = await UserModel.findOne({email, token});
        if(!user){
            return false;
        }
        return true;
    }catch(error){
        return false;
    }
}

