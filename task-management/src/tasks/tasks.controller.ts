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
import { Task, TaskStatus } from './Task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchFilterDto } from './dto/search-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() searchFilterDto: SearchFilterDto): Task[] {
    if (Object.keys(searchFilterDto).length) {
      console.log('HI');
      return this.taskService.getFilteredTasks(searchFilterDto);
    } else return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }

  @Post()
  createTask(@Body() create_task_dto: CreateTaskDto): Task {
    return this.taskService.createTask(create_task_dto);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    console.log(status);
    console.log(id);
    return this.taskService.updateTask(id, status);
  }
}
