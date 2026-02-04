import { NextFunction, Request, Response } from "express";

// Type for async Express handlers
type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Higher-order function to wrap async handlers and catch errors
export const createAsyncFn = (fn: AsyncFn) => 
    (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch((err) => next(err));
    };
