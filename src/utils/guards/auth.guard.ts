import { CanActivate, ExecutionContext, Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SKIP_AUTH_KEY } from "../decorators/skip-auth.decorator";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JWTService } from "../commonservices/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private reflector: Reflector,
        private jwtService: JwtService,
        private readonly localJwtService: JWTService,
        private readonly configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext) {
        const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // console.log(context.getHandler());
        // console.log(context.getClass());
        if (skipAuth) return true;

        const request = context.switchToHttp().getRequest();
        // console.log(request);
        const authHeader = request.headers['authorization'];
        // console.log('Authorization header:', authHeader);

        if(!authHeader){
            throw new UnauthorizedException('Missing Authorization Header');
        }

        const [type, token] = authHeader.split(' ');
        // console.log('Type:', type);
        // console.log('Token:', token);

        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid Authorization format');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET')
            });
            request.user = payload;
            // console.log(request.user);
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
        
    }    
}