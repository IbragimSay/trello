import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
    constructor(
        private readonly PrismaService:PrismaService
    ){}

}
