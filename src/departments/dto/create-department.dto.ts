import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Department name', example: 'Engineering' })
  @IsString()
  @IsNotEmpty()
  name: string;
}