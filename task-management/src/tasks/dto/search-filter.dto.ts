import { TaskStatus } from '../Task.model';

import { IsOptional, IsEnum, IsString } from 'class-validator';

export class SearchFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
