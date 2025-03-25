import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { UsersService } from '@module/users/users.service';
import { User } from '@module/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, User])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, UsersService],
})
export class DepartmentsModule {}
