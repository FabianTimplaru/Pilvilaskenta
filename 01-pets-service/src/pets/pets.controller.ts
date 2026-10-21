import { Pet } from './entities/pet entitiy';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('pets')
@ApiTags('pets')
export class PetsController {


    constructor(private readonly petsService: PetsService) { }

    @Post()
    @ApiOperation({ summary: 'Create Pet' })
    @ApiCreatedResponse({
        description: 'Pet has been created succesfully',
        type: Pet
    })
    createPet(@Body() createPetDto: CreatePetDto): Pet {
        return this.petsService.insertPet(createPetDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all pets' })
    @ApiResponse({ status: 200, description: 'ok' })
    getPets(): Pet[] {
        return this.petsService.getPets();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get single pet' })
    @ApiResponse({ status: 200, description: 'ok' })
    @ApiResponse({ status: 404, description: 'matching id not found' })
    getPet(@Param('id') id: string): Pet {
        return this.petsService.getPet(id);
    }
}

