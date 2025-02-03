import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
    });

  }

  async validate(payload: any): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id: payload.sub },
      relations: ['role', 'department'],
        });
    if (!employee) {
      console.log('Invalid token: Employee not found');
      throw new UnauthorizedException('Invalid token');
    }
    console.log('User validated:', employee);
    return employee;
  }
}