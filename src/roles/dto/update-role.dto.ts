import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ description: 'Role name', example: 'Manager', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}