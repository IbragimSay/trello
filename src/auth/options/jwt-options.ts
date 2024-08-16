import { ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

const getJwtModeleOptions = (config:ConfigService):JwtModuleOptions=>({
    secret: config.get("JWT_SECRET"),
    signOptions: {
        expiresIn: config.get("EXT", "1h")
    }
})
export const options = ():JwtModuleAsyncOptions=>({
    inject: [ConfigService],
    useFactory: (config:ConfigService)=>getJwtModeleOptions(config)
})