import { TaskStatus } from '../Task.model';

export class SearchFilterDto {
  status?: TaskStatus;
  search?: string;
}
