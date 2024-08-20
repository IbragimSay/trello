import { Users } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserResponse {
    id:string
    mail:string
    @Exclude()
    password:string
    constructor(user:Users){
        return Object.assign(this, user)
    }
}