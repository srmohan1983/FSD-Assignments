import { Project } from './project.model';
import { ParentTask } from './parentTask.model';
import { User } from './user.model';

export class EditTaskRequest {

  taskID: number;
  task: string;
  startDate: Date;
  endDate: Date;
  priority: number;
  status: string;
  project: Project;
  parent: ParentTask;
  user: User;
  oldUserId: number;

}
