import { User } from '../../users/entities/user.entity.js';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from "typeorm";
import type { Relation } from 'typeorm';

@Entity()
export class Profile {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    gender: string;

    @Column()
    photo: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => User, (user) => user.profile)
    user: Relation<User>;
}