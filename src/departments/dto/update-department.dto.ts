import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({ description: 'Department name', example: 'HR', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}