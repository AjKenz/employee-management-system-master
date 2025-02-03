import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiProperty({ description: 'Employee name', example: 'John Doe', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Employee email', example: 'john.doe@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Employee password', example: 'newpassword123', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ description: 'Role ID', example: 2, required: false })
  @IsOptional()
  roleId?: number;

  @ApiProperty({ description: 'Department ID', example: 2, required: false })
  @IsOptional()
  departmentId?: number;
}