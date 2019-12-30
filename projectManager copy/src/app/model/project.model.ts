import { Task } from './task.model';
import { User } from './user.model';

export class Project {

  projectID: number;
  projectTitle: string;
  startDate: Date;
  endDate: Date;
  priority: number;
  TaskRecords: Task;
  userRecords: Array<User> = [];

}
