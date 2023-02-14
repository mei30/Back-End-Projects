import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchFilterDto } from './dto/search-filter.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Task } from './dto/task.entity';
import { getUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query() searchFilterDto: SearchFilterDto,
    @getUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(searchFilterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @getUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @getUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() create_task_dto: CreateTaskDto,
    @getUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(create_task_dto, user);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @getUser() user: User,
  ): Promise<Task> {
    const { status } = updateStatusDto;
    return this.taskService.updateTask(id, status, user);
  }
}
