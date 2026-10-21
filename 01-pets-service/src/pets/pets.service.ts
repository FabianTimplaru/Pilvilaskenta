import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entities/pet entitiy';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PetsService {
    pets: Pet[] = []; // in-memory db of Pets

    insertPet(createPetDto: CreatePetDto): Pet {
        const id = uuidv4();
        const pet = new Pet(
            id,
            createPetDto.name,
            createPetDto.description,
            createPetDto.date_of_birth
        );
        this.pets.push(pet);
        return pet;

    }
    getPets(): Pet[] {
        return [...this.pets];
    }

    getPet(id: string): Pet {
        const pet = this.pets.find(pet => pet.pet_id === id);

        if (!pet) {
            throw new NotFoundException(`Pet with ID ${id} not found`);
        }

        return pet;
    }
}