import { Request, Response } from "express";
import { createAsyncFn } from "../../utils/create.async.fn";
import { userServices } from "./user.services";

export const registerUserIntoDB=createAsyncFn(async(req:Request,res:Response)=>{
    const user=userServices.registerUserIntoDB(req.body)

    
})