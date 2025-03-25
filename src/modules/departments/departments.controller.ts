import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto, DepartmentSchema } from './dto/department.dto';
import { ApiBody } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { ApiResponse } from '@utils/response.util';
import { HttpStatusCodes } from '@constants/http.constants';
import { formatZodError } from '@utils/format-zod-error.util';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiBody({ schema: zodToOpenAPI(DepartmentSchema) })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const parsedResult = DepartmentSchema.safeParse(createDepartmentDto);
    if (!parsedResult.success) {
      const formattedErrors = formatZodError(parsedResult.error);
      throw new BadRequestException(formattedErrors);
    }
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: any) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
}
