import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DepartmentsService } from '@module/departments/departments.service';
import { Department } from '@module/departments/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Department])],
  controllers: [UsersController],
  providers: [UsersService, DepartmentsService],
})
export class UsersModule {}
