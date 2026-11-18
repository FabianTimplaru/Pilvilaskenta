import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }
    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.findUserByUsername(username);

        if (user && user.password === password) {
            // const {password, ...result} = user;
            const result = {
                id: user.id,
                name: user.name,
                email: user.email,
                password: "",
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                profile: user.profile
            };
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
