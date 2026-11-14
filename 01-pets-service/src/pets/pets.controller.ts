import { Pet } from './entities/pet entity';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Body, Controller, Post, Delete, Get, Patch, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
@ApiTags('pets')
export class PetsController {

    constructor(private readonly petsService: PetsService) { }

    @Post()
    @ApiOperation({ summary: 'Create Pet' })
    @ApiCreatedResponse({
        description: 'Pet has been created successfully.',
        type: Pet
    })
    @ApiResponse({ status: 400, description: 'Invalid data!' })
    createPet(@Body() createPetDto: CreatePetDto): Pet {
        return this.petsService.insertPet(createPetDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all pets' })
    @ApiResponse({ status: 200, description: 'OK', type: [Pet] })
    getPets(): Pet[] {
        return this.petsService.getPets();
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the pet',
        type: String
    })
    @ApiOperation({ summary: 'Get single pet' })
    @ApiResponse({ status: 200, description: 'OK', type: Pet })
    @ApiResponse({ status: 404, description: 'Pet with the specified ID not found.' })
    getPet(@Param('id') id: string): Pet {
        return this.petsService.getPet(id);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the pet',
        type: String
    })
    @ApiOperation({ summary: 'Delete Pet' })
    @ApiResponse({ status: 204, description: 'Pet deleted!' })
    @ApiResponse({ status: 404, description: 'Pet with the specified ID not found.' })
    @HttpCode(HttpStatus.NO_CONTENT)
    removePet(@Param('id') id: string): void {
        this.petsService.removePet(id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the pet',
        type: String
    })
    @ApiOperation({ summary: 'Update Pet' })
    @ApiResponse({ status: 200, description: 'Pet updated successfully!', type: Pet })
    @ApiResponse({ status: 400, description: 'Invalid pet data!' })
    @ApiResponse({ status: 404, description: 'Pet with the specified ID not found.' })
    updatePet(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto): Pet {

        return this.petsService.updatePet(id, updatePetDto);
    }
}

