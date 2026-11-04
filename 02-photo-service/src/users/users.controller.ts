import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { User } from './entities/user.entity.js';
import { Body } from '@nestjs/common';
import { CreateUserWithProfile } from './dtos/create-user-with-profile.dto.js';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async createUser(
        @Body() createUserWithProfile: CreateUserWithProfile
    ): Promise<User> {
        console.log(`DTO: ${JSON.stringify(createUserWithProfile)}`);
        return await this.usersService.insertUserWithProfile(createUserWithProfile);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }
}
