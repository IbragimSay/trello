import { jwtPayload } from './../../interface';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const User = createParamDecorator((data:string , ctx:ExecutionContext):jwtPayload | string=>{
    const req:Request = ctx.switchToHttp().getRequest()
    const user = req.user
    return data ? user?.[data] : user
})