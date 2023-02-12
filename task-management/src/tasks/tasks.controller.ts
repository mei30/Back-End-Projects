import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchFilterDto } from './dto/search-filter.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Task } from './dto/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() searchFilterDto: SearchFilterDto): Promise<Task[]> {
      return this.taskService.getTasks(searchFilterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  @Post()
  createTask(@Body() create_task_dto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(create_task_dto);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Task> {
    const { status } = updateStatusDto;
    return this.taskService.updateTask(id, status);
  }
}
