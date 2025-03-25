import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto, DepartmentSchema } from './dto/department.dto';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleServiceError } from '@utils/error-handler.util';
import { ApiResponse } from '@utils/response.util';
import { HttpStatusCodes } from '@constants/http.constants';
import { UsersService } from '@module/users/users.service';
import { UserSchema } from '@module/users/dto/user.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  async create(dto: CreateDepartmentDto) {
    try {
      const manager = await this.userService.findById(dto.managerId);
      if ('error' in manager) {
        return ApiResponse.error(manager.statusCode, manager.error);
      }
      const dep = this.departmentsRepository.create({ ...dto, manager: manager.data });
      await this.departmentsRepository.save(dep);
      return ApiResponse.success(HttpStatusCodes.CREATED, dep);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  findAll() {
    return `This action returns all departments`;
  }
  async findById(id: number) {
    try {
      const dep = await this.departmentsRepository.findOneBy({ id });
      if (!dep) {
        return ApiResponse.error(HttpStatusCodes.NOT_FOUND, 'Department not found');
      }
      return ApiResponse.success(HttpStatusCodes.OK, dep);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: any) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
