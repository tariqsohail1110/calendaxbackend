import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

export class JwtPayload {
    sub: string;
    email: string;
    roles: string[];
    type: 'access' | 'refresh'
}

@Injectable()
export class JWTService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    generateAccesToken(id: number, email: string) {
        const payload = {
            sub: id,
            email: email,
            type: 'access'
        }
        return this.jwtService.sign(
            payload,
            {   
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get<number>('JWT_ACCESS_EXPIRES_IN'),
            }
        )
    }


    generateRefreshToken(id: number, email: string) {
        const payload = {
            sub: id,
            email: email,
            type: 'refresh'
        }
        return this.jwtService.sign(
            payload,
            {            
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<number>('JWT_REFRESH_EXPIRES_IN'),
        })
    }
}