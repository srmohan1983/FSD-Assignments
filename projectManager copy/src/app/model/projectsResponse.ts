import { Task } from './task.model';
import { User } from './user.model';
import { Project } from './project.model';

export class ProjectsResponse {

  project: Project;
  tasksCount: number;
  completedTasksCount: number;

}
