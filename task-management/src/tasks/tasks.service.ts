import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './Task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchFilterDto } from './dto/search-filter.dto';
import { stat } from 'fs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(searchFilterDto: SearchFilterDto): Task[] {
    const { status, search } = searchFilterDto;

    let tasks: Task[] = this.getAllTasks();

    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
      console.log(status, tasks);
    }

    if (search) {
      tasks = this.tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search))
          return true;
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string) {
    return this.tasks.splice(
      this.tasks.findIndex((task) => task.id == id),
      1,
    );
  }

  createTask(create_task_dto: CreateTaskDto): Task {
    const { title, description } = create_task_dto;

    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);

    if (!task) return task;

    task.status = status;

    return task;
  }
}
