import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { Strategy } from "./auth.service";
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) Promise<User> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('username or password not found');
        }
        return user;
    }
}
