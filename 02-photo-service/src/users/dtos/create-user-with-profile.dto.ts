import { IntersectionType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { CreateProfileDto } from '../../profiles/dtos/create-profile.dto.js';

export class CreateUserWithProfile extends IntersectionType(CreateUserDto, CreateProfileDto) {
}
