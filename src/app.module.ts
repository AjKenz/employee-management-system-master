import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { RolesModule } from './roles/roles.module';
import { DepartmentsModule } from './departments/departments.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles/entities/role.entity';
import { Employee } from './employee/entities/employee.entity';
import { Department } from './departments/entities/department.entity';
import * as secrets from './secrets';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: secrets.DB_HOST,
      port: 5432,
      username: secrets.DB_USERNAME,
      password: secrets.DB_PASSWORD,
      database: secrets.DB_DATABASE,
      entities: [Role, Employee, Department],
      synchronize: true,
    }),
    EmployeeModule,
    RolesModule,
    DepartmentsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }, 
     {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  Reflector,
],
})
export class AppModule { }
