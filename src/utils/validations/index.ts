import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string({required_error: "Name is required"}),
    email: z
        .string({required_error: "Email is required"})
        .email({message: "Invalid email address"}),
    password: z
        .string({required_error: "Password is required"})
        .min(6, {message: "Password must be at least 6 characters"})
        

});
export const loginSchema = z.object({
    email: z
        .string({required_error: "Email is required"})
        .email({message: "Invalid email address"}),
    password: z
        .string({required_error: "Password is required"})
        .min(6, {message: "Password must be at least 6 characters"})
        

});
export const MessageSchema = z.object({
    to: z
        .string({required_error: "Recipient is required"}),
    sender: z
        .string({required_error: "Sender is required"}),
    subject: z
        .string({required_error:'Subject is required'}),
    body: z
        .string({required_error: 'Body is required'})
        
});

export const validateEmail=(email: string)=> {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }