import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('username or password not found');
        }
        return user;
    }
}
