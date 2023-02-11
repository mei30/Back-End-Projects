import { TaskStatus } from '../Task.model';
import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
