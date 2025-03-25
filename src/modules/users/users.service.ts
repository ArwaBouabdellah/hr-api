import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { DepartmentsService } from '@module/departments/departments.service';
import { handleServiceError } from '@utils/error-handler.util';
import { ApiResponse } from '@utils/response.util';
import { HttpStatusCodes } from '@constants/http.constants';
import { UserMessages } from '@constants/response-messages.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => DepartmentsService))
    private readonly departmentService: DepartmentsService,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      if (dto.email) {
        const isEmailExists = await this.findByEmail(dto?.email);
        if ('error' in isEmailExists) {
          return isEmailExists;
        }
      }

      if (dto.tel) {
        const isPhoneExists = await this.findByTel(dto?.tel);
        if ('error' in isPhoneExists) {
          return isPhoneExists;
        }
      }

      const user = this.usersRepository.create(dto);
      if (dto.departmentId) {
        const departmentResponse = await this.departmentService.findById(dto.departmentId);
        if ('error' in departmentResponse || departmentResponse.statusCode === 404) {
          return departmentResponse;
        }
        user.department = departmentResponse.data;
      }

      await this.usersRepository.save(user);
      return ApiResponse.success(HttpStatusCodes.OK, user);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      return ApiResponse.success(HttpStatusCodes.OK, !!user);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  async findByTel(tel: string) {
    try {
      const user = await this.usersRepository.findOneBy({ tel });
      return ApiResponse.success(HttpStatusCodes.OK, !!user);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  async findById(id: number) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        if (!user) {
          throw new NotFoundException(UserMessages.USER_NOT_FOUND(id));
        }
      }
      return ApiResponse.success(HttpStatusCodes.OK, user);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
