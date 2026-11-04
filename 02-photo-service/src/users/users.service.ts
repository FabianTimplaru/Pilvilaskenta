import { Injectable } from '@nestjs/common';
import { CreateUserWithProfile } from './dtos/create-user-with-profile.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { ProfilesService } from '../profiles/profiles.service.js';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>, private readonly profilesService: ProfilesService) { }

    async insertUserWithProfile(createUserWithProfile: CreateUserWithProfile): Promise<User> {
        const exists = await this.usersRepository.findOne({ where: { email: createUserWithProfile.email } });
        if (exists) {
            throw new Error('Email already taken');
        }

        const profile = await this.profilesService.insertProfile(createUserWithProfile.gender, createUserWithProfile.photo);
        const user = new User();
        user.name = createUserWithProfile.name;
        user.email = createUserWithProfile.email;
        user.password = createUserWithProfile.password;
        user.profile = profile;

        console.log(`insertProfile: ${JSON.stringify(profile)}`);

        return await this.usersRepository.save(user);
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({ relations: { profile: true } });
    }

}
