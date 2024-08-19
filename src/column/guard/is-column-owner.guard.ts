import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { ColumnService } from '../column.service';
import { jwtPayload } from 'src/interface';
import { Columns } from '@prisma/client';

@Injectable()
export class IsColumnOwnerGuard implements CanActivate {
  constructor(
    private readonly columnsService: ColumnService
) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req:Request = ctx.switchToHttp().getRequest()
    const columnId:number = parseInt(req.params.columnId)
    const user = req.user as jwtPayload
    

    if (!user) {
      throw new ForbiddenException();
    }

    const column:Columns = await this.columnsService.getOne(columnId);
    if (!column) {
      throw new BadRequestException();
    }

    if(column.usersId != user.id){
        throw new ForbiddenException()
    }

    return true;
  }
}