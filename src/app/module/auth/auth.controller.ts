import { Request, Response } from "express";
import { createAsyncFn } from "../../utils/create.async.fn";
import { authServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
const loginUserFromDB=createAsyncFn(async(req:Request,res:Response)=>{
const user=await authServices.loginUserFromDB(req.body)

sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Login user successfully",
    data:user
})
})


export const authController={
    loginUserFromDB
}