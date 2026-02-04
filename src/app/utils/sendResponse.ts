import { Response } from "express";

interface ISendResponse<T>{
success:boolean;
statusCode:number;
message:string;
data:T | null
}

export const sendResponse=<T>(res:Response,data:ISendResponse<T>)=>{
res.status(data.statusCode).json({
    success:data.success,
    statusCode:data.statusCode,
    message:data.message,
    data:data.data
})
}