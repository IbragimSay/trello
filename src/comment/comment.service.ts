import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
    constructor(
        private readonly prismaService:PrismaService
    ){}

}
