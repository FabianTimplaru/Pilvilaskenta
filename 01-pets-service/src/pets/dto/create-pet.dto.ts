import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString, Length } from "class-validator";

export class CreatePetDto {
    @IsString()
    @ApiProperty({ example: 'Pluto', description: 'Name of pet.' })
    name: string;

    @IsString()
    @Length(10, 200)
    @ApiProperty({ example: 'Friendly yellow dog', description: 'Characteristics of pet.' })
    description: string;

    @IsString()
    @IsDateString()
    @ApiProperty({ example: '1950-01-01', description: 'birthday' })
    date_of_birth: string;
}