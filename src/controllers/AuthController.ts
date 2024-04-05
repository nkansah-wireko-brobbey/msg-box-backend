import  express  from "express";
import { loginSchema, registerSchema } from "../utils/validations";
import bcrypt from 'bcrypt';
import { UserModel } from "../db/user";
import { generateToken } from "../middlewares/authenticate";
import { IRequest, IUser } from "../models/common.model";

class AuthController{

    public async login(request: express.Request, response: express.Response){

        try{

            const {email, password} = request.body;

            loginSchema.parse({email, password});

            const user = await UserModel.findOne({email});

            if(!user){
                return response.status(404).json({status: false, message: "User not found"});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(!isPasswordValid){
                return response.status(400).json({status: false, message: "Invalid password"});
            }

            const data: IUser = {_id: user._id.toString(), name: user.name, email: user.email, token: ''};

            const token = generateToken(data);

            user.token = token;

            await user.save();

            data.token = token;

            return response
            .status(200)
            .json(
                {
                    status: true, 
                    data: data, 
                    message: "Login successful"
                });

        }catch(error){
            return response.status(500).json({status: false, error});
        }

    }
    
    public async register(request: express.Request, response: express.Response){

        try{

            const {name, email, password} = request.body;

            registerSchema.parse({name, email, password});

            const salt = bcrypt.genSaltSync(10);

            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await new UserModel({name, email, password: hashedPassword}).save();

            return response.status(201).json({status: true, data: user, message: "User created successfully"});

        }catch(error){
            return response.status(500).json({status: false, error});
        }

    }
    public async logout(request: IRequest, response: express.Response){


        try{
            const email = request.user?.email;

            const user = await UserModel.findOne({email});

            if(user){
                user.token = null;
                await user.save()
            }

           return response
                    .status(200)
                    .json({message: "User logged out"});

        }catch(error){

            return response
                    .status(403)
                    .json({message: error})
        }

    }
}

export default new AuthController()