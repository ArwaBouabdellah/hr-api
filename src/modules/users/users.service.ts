import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { DepartmentsService } from '@module/departments/departments.service';
import { handleServiceError } from '@utils/error-handler.util';
import { ApiResponse } from '@utils/response.util';
import { HttpStatusCodes } from '@constants/http.constants';
import { UserMessages } from '@constants/response-messages.constants';
import { formatName } from '@utils/format-name.util';

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

      const user = this.usersRepository.create({
        ...dto,
        firstName: formatName(dto.firstName),
        lastName: formatName(dto.lastName),
      });

      if (dto.departmentId) {
        const departmentResponse = await this.departmentService.findById(dto.departmentId);
        if ('error' in departmentResponse) {
          return departmentResponse;
        }
        user.department = departmentResponse.data;
      }

      await this.usersRepository.save(user);
      return ApiResponse.success(HttpStatusCodes.CREATED, user);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find({ relations: ['department'] });
    } catch (error) {
      return handleServiceError(error);
    }
  }

  async findByDepartment(departmentId: number) {
    try {
      const dep = await this.departmentService.findById(departmentId);
      if ('error' in dep) {
        return dep;
      }
      return await this.usersRepository.find({
        where: { department: { id: departmentId } },
        relations: ['department'],
      });
    } catch (error) {
      return handleServiceError(error);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (user) {
        throw new ConflictException('Email already taken');
      }
      return ApiResponse.success(HttpStatusCodes.OK, !!user);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  async findByTel(tel: string) {
    try {
      const user = await this.usersRepository.findOneBy({ tel });
      if (user) {
        throw new ConflictException(`Tel already exists`);
      }
      return ApiResponse.success(HttpStatusCodes.OK, !!user);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  async findById(id: number) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(UserMessages.USER_NOT_FOUND(id));
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
