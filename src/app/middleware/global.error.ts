import { NextFunction, Request, Response } from "express";
import httpStatus  from "http-status";
 const  globalErrorHandelar =(
    err:any,
    request:Request,
    response:Response,
    next:NextFunction
)=>{
let statusCode=500;
let message="Somthing Is Wrong"
let errorDeatils:any=[]


response.status(statusCode).json({
    success:false,
    message,
    errorDeatils
})

}

export default globalErrorHandelar