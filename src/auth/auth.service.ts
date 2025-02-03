import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { Role } from '../roles/entities/role.entity';
import { RegisterDto,LoginDto } from './dto/index.dto';
import * as bcrypt from 'bcrypt';
import { Department } from '../departments/entities/department.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,

    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { email },
      relations: ['role', 'department'],
    });
    if (employee) {
      const isPasswordValid = await bcrypt.compare(password, employee.password);
      if (isPasswordValid) {
        console.log('Password is valid');
        return employee;
      } else {
        console.log('Invalid password');
      }
    } else {
      console.log('User not found');
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const employee = await this.validateUser(loginDto.email, loginDto.password);

    const roleName = employee.role ? employee.role.name : 'Admin';
    const payload = {
      email: employee.email,
      sub: employee.id,
      role: roleName,
      departmentId: employee.department?.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async register(registerDto: RegisterDto, user?: Employee): Promise<Employee> {
    const employeeCount = await this.employeeRepository.count();

    if (employeeCount === 0) {

      let adminRole = await this.roleRepository.findOne({ where: { name: 'Admin' } });

      if (!adminRole) {
        adminRole = this.roleRepository.create({ name: 'Admin' });
        await this.roleRepository.save(adminRole);
      }

      let adminDepartment = await this.departmentRepository.findOne({ where: { name: 'Admin' } });

      if (!adminDepartment) {
        adminDepartment = this.departmentRepository.create({ name: 'Admin' });
        await this.departmentRepository.save(adminDepartment);
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const newEmployee = this.employeeRepository.create({
        ...registerDto,
        password: hashedPassword,
        role: adminRole,
        department: adminDepartment,
      });

      return this.employeeRepository.save(newEmployee);
    } else {
      if (!user || user.role.name !== 'Admin') {
        throw new UnauthorizedException('Only an admin can create new employees');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const newEmployee = this.employeeRepository.create({
        ...registerDto,
        password: hashedPassword,
        role: { id: registerDto.roleId },
        department: { id: registerDto.departmentId },
      });

      return this.employeeRepository.save(newEmployee);
    }
  }

}