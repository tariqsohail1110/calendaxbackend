import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Injectable, Req, UnauthorizedException } from "@nestjs/common";

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


    async refresh(refreshToken: string) {
        try{
            const payload = await this.jwtService.verifyAsync(refreshToken,
            {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET')
            }
            )

            if (payload.type !== 'refresh') {
                throw new UnauthorizedException("Invalid Token Type");
            }
            
            const newAccessToken = this.generateAccesToken(
                payload.sub,
                payload.email
            )
            console.log(newAccessToken);

            return {
                newAccessToken
            };
        }catch (error) {
            console.error('Refresh token error:', error.message);
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }
}   