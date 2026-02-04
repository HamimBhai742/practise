import { Request, Response } from "express";
import { createAsyncFn } from "../../utils/create.async.fn";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'


export const registerUserIntoDB=createAsyncFn(async(req:Request,res:Response)=>{
    const user=await userServices.registerUserIntoDB(req.body)

    
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:user.message,
        data:user.newUser
    })
})


export const userController = {
    registerUserIntoDB
}