import { CardService } from './../card.service';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { jwtPayload } from 'src/interface';
import { Columns } from '@prisma/client';

@Injectable()
export class IsCardOwnerGuard implements CanActivate {
  constructor(
    private readonly cardService:CardService 
) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req:Request = ctx.switchToHttp().getRequest()
    const cardId:number = parseInt(req.params.cardId)
    const user = req.user as jwtPayload
    if (!user) {
      throw new ForbiddenException();
    }

    const card:Columns = await this.cardService.getOne(cardId);
    if (!card) {
      throw new BadRequestException();
    }

    if(card.usersId != user.id){
        throw new ForbiddenException()
    }

    return true;
  }
}