import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entities/pet entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePetDto } from './dto/update-pet.dto';

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

    removePet(id: string): void {
        const index = this.pets.findIndex(pet => pet.pet_id === id);

        if (index < 0) {
            throw new NotFoundException(`Pet with ID ${id} not found`);
        }

        this.pets.splice(index, 1);
    }

    updatePet(id: string, updatePetDto: UpdatePetDto): Pet {
        const pet = this.pets.find(pet => pet.pet_id === id);

        if (!pet) {
            throw new NotFoundException(`Pet with ID ${id} not found`);
        }

        Object.assign(pet, updatePetDto);
        return pet;
    }
}