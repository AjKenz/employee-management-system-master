import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeesController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeeService],
  exports: [TypeOrmModule.forFeature([Employee]), EmployeeService], 
})
export class EmployeeModule {}
