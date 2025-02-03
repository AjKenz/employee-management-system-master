import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 10);
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      password: hashedPassword,
    });
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['role', 'department'] });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['role', 'department'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto, user: Employee): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['department', 'role'],
    });
  
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
  
    if (!user.role || !user.department) {
      throw new ForbiddenException('Invalid user data: role or department missing');
    }
  
    if (user.role.name === 'Manager' && employee.department?.id !== user.department?.id) {
      throw new ForbiddenException('Managers can only update employees within their own department');
    }
  
    if (updateEmployeeDto.password) {
      updateEmployeeDto.password = await bcrypt.hash(updateEmployeeDto.password, 10);
    }
  
    Object.assign(employee, updateEmployeeDto);
    return this.employeeRepository.save(employee);
  }
  

  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }

  async getEmployeeByEmail(email: string): Promise<Employee> {
    return this.employeeRepository.findOne({ where: { email } });
  }
}