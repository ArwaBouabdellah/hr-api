import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserSchema, UserSchema } from './dto/user.dto';
import { ApiBody } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { formatZodError, parseDto } from '@utils/format-zod-error.util';
import { HttpStatusCodes } from '@constants/http.constants';
import { ApiResponse } from '@utils/response.util';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ schema: zodToOpenAPI(CreateUserSchema) })
  create(@Body() createUserDto: CreateUserDto) {
    const parsedResult = CreateUserSchema.safeParse(createUserDto);
    if (!parsedResult.success) {
      const formattedErrors = formatZodError(parsedResult.error);
      throw new BadRequestException(formattedErrors);
    }

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
