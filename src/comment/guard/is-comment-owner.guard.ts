import { CommentService } from './../comment.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from './../../prisma/prisma.service';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';
import { jwtPayload } from 'src/interface';

@Injectable()
export class IsCommentOwner implements CanActivate {
    constructor (
        private readonly commentService:CommentService
    ){}
    async canActivate(ctx: ExecutionContext):Promise<boolean> {
        const req:Request = ctx.switchToHttp().getRequest()
        const user = req.user as jwtPayload
        if(!user){
            throw new ForbiddenException()
        }
        const commentId:number = parseInt(req.params.commentId)
        const comment = await this.commentService.getOne(commentId)
        if(!comment){
            throw new BadRequestException()
        }
        
        if(user.id != comment.usersId){
            throw new ForbiddenException()
        }

        return true
    }
}