import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "crypto";
import { readFile } from "fs";
import { join } from "path";
import { promisify } from "util";
import { InvalidTokenException } from "src/utils/exceptions/invalidToken.exception";
import { TokenExpiredError } from "src/utils/exceptions/tokenExpired.exception";
import { BadTokenException } from "src/utils/exceptions/badToken.exception";


export class JwtPayload {
    iss: string;
    sub: string;
    aud: string;
    exp: string;
    prm: string;

    constructor(issuer: string, audience: string, subject: string, param: string,
        expiresIn: string) {
            this.iss = issuer;
            this.sub = subject;
            this.aud = audience;
            this.exp = expiresIn;
            this.prm = param;
        }
}

@Injectable()
export class JWTService {
    constructor(
        private readonly jwtService: JwtService
    ) {
    }
    
    private readPublicKey(): Promise<string>{
        return promisify(readFile)(join(__dirname, '../../../keys/public.pem'), 'utf-8');
    }

    private readPrivateKey(): Promise<string>{
        return promisify(readFile)(join(__dirname, '../../../keys/private.pem'), 'utf-8');
    }

    async generateTokenKey(bytes: number = 64, algo: 'hex' = 'hex') {
        return await randomBytes(bytes).toString(algo);
    }

    public async encode(payload: JwtPayload): Promise<string> {
        try{
            const cert = await this.readPrivateKey();
            if(!cert) throw new BadRequestException('Token generation failed');
            return this.jwtService.signAsync(
                {
                    prm: payload.prm
                },{
                    issuer: payload.iss,
                    audience: payload.aud,
                    subject: payload.sub,
                    expiresIn: parseInt(payload.exp),
                    privateKey: cert,
                    algorithm: 'RS256',
                }
            )
        } catch(error) {
            console.log("Failed to sign Jwt authentication token", error)
            throw new Error(error);
        }
    }


    public async validate(token: string): Promise<JwtPayload> {
        const cert = await this.readPublicKey();
        try{
            const decodedToken = await this.jwtService.verifyAsync<JwtPayload>(
                token,
                { publicKey: cert }
            );
            return decodedToken;
        }catch(e: any) {
            console.log(e);
            if (e && e.name === 'TokenExpiredError') throw new TokenExpiredError();
            throw new InvalidTokenException();
        }
    }


    public async decode(token: string): Promise<JwtPayload>{
        const cert = await this.readPublicKey();
        try{
            const decodedToken = await this.jwtService.verifyAsync<JwtPayload>(
                token,
                { publicKey: cert, ignoreExpiration: true }
            );
            return decodedToken;
        } catch (e) {
            console.log(e)
            throw new BadTokenException();
        }
    }
}