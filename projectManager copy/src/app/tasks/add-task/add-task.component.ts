import { Component, OnInit } from "@angular/core";
import { Project } from "src/app/model/project.model";
import { User } from "src/app/model/user.model";
import { Task } from "src/app/model/task.model";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { ProjectService } from 'src/app/project.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ParentTask } from 'src/app/model/parentTask.model';
import { EditTaskResponse } from 'src/app/model/editTaskResponse';


function dateCompare(c: AbstractControl): { [key: string]: boolean } | null {
  const startDate = c.get("startDate");
  const endDate = c.get("endDate");
  if (endDate.value < startDate.value) {
    return { match: true };
  }
  return null;
}

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"]
})
export class AddTaskComponent implements OnInit {

  id: number;
  oldUserID: number;
  taskForm: FormGroup;
  users: any = [];
  projects: any=[];
  tasks: any[];
  parentTasks: any=[];
  newTask: Task = new Task();
  selProject: Project = new Project();
  parentTask: ParentTask = new ParentTask();
  userAssigned: User = new User();
  editTask: EditTaskResponse = new EditTaskResponse();
  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
              private http: HttpClient,
              private router: Router,
              private datepipe: DatePipe,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      projectInput: ["", [Validators.required]],
      projectSearch: ["Search"],
      taskName: ["", [Validators.required]],
      userSearch: [""],
      parentTaskGroup: this.fb.group(
        {
          parentTaskCheckbox: [""],
          priorityRange: ["0"],
          parentTaskInput: [""],
          parentTaskSearch: ["Search"],
          startDate: [{ value: "", disabled: false }, [Validators.required]],
          endDate: [{ value: "", disabled: false }, [Validators.required]]
        },
        { validator: dateCompare }
      )
    });

    this.id = this.route.snapshot.params['id'];
    console.log("Router Snapshot Param " + this.id);
    if (this.id != null) {
      this.projectService.getTasksById(this.id).subscribe(
        data => {
          console.log(data);
          this.editTask = data;
          console.log("edittask Response Object " + JSON.stringify(this.editTask));
          this.setTaskForm(this.editTask);
          this.loadUsers();
        },
        error => console.log(error)
      );
    }

    if (this.id == null) {
      console.log("Id is null");
      this.loadProjects();
      this.loadUsers();
      this.loadTasks();
      this.loadParentTasks();
    };

  }


  loadProjects() {
    this.projectService.getProjects().subscribe(
      data => {
        console.log(data);
        this.projects = data;
      },
      error => console.log(error)
    );
  }

  loadUsers() {
    this.projectService.getUsers().subscribe(
      data => {
        console.log(data);
        this.users = data;
      },
      error => console.log(error)
    );
  }

  loadTasks() {
    this.projectService.getTasks().subscribe(
      data => {
        console.log(data);
        this.tasks = data;
      },
      error => console.log(error)
    );
  }

  loadParentTasks() {
    this.projectService.getParentTasks().subscribe(
      data => {
        console.log(data);
        this.parentTasks = data;
      },
      error => console.log(error)
    );
  }

  setTaskForm(editTask: EditTaskResponse): void {
    const projectFormInputControl = this.taskForm.get("projectInput");
    const projectFormSearchControl = this.taskForm.get("projectSearch");
    const taskNameControl = this.taskForm.get("taskName");
    const parentCheckboxControl = this.taskForm.get(
      "parentTaskGroup.parentTaskCheckbox"
    );
    const priorityRangeControl = this.taskForm.get("parentTaskGroup.priorityRange");
    const parentTaskFormControl = this.taskForm.get("parentTaskGroup.parentTaskInput");
    const parentTaskSearchControl = this.taskForm.get("parentTaskGroup.parentTaskSearch");
    const startDateControl = this.taskForm.get("parentTaskGroup.startDate");
    const endDateControl = this.taskForm.get("parentTaskGroup.endDate");
    const userFormControl = this.taskForm.get("userSearch");

    projectFormInputControl.setValue(this.editTask.projectTitle);
    projectFormSearchControl.disable();
    taskNameControl.setValue(this.editTask.task);
    parentCheckboxControl.disable();
    priorityRangeControl.setValue(this.editTask.priority);
    parentTaskFormControl.setValue(this.editTask.parentTask);
    parentTaskSearchControl.disable();
    startDateControl.setValue(this.datepipe.transform(this.editTask.startDate, 'yyyy-MM-dd'));
    endDateControl.setValue(this.datepipe.transform(this.editTask.endDate, 'yyyy-MM-dd'));
    userFormControl.setValue(this.editTask.firstName + this.editTask.lastName);
  }

  onSelectProject(project: Project): void {
    const projectFormInputControl = this.taskForm.get("projectInput");
    projectFormInputControl.setValue(project.projectTitle);
    this.selProject.projectID = project.projectID;

  }

  onSelectTask(modalParentTask: ParentTask): void {
    const parentTaskFormControl = this.taskForm.get("parentTaskGroup.parentTaskInput");
    console.log("Modal Control Parent Task" + modalParentTask.parentTask);
    parentTaskFormControl.setValue(modalParentTask.parentTask);
    this.parentTask.parentID = modalParentTask.parentID;
  }

  onSelectUser(user: User): void {
    const userFormControl = this.taskForm.get("userSearch");
    userFormControl.setValue(user.firstName);
    this.userAssigned.userID = user.userID;
  }

  parentCheckboxChecked() {
    const parentCheckboxControl = this.taskForm.get(
      "parentTaskGroup.parentTaskCheckbox"
    );
    const startDateControl = this.taskForm.get("parentTaskGroup.startDate");
    const endDateControl = this.taskForm.get("parentTaskGroup.endDate");
    const parentTaskFormControl = this.taskForm.get("parentTaskGroup.parentTaskInput");
    const parentTaskSearchControl = this.taskForm.get("parentTaskGroup.parentTaskSearch");
    const priorityRangeControl = this.taskForm.get("parentTaskGroup.priorityRange");
    const taskNameControl = this.taskForm.get("taskName");
    startDateControl.disable();
    endDateControl.disable();
    startDateControl.setValue("");
    endDateControl.setValue("");
    parentTaskFormControl.setValue("");
    parentTaskSearchControl.disable();
    priorityRangeControl.disable();
    this.parentTask.parentTask = taskNameControl.value;
    if (parentCheckboxControl.value) {
      startDateControl.enable();
      endDateControl.enable();
      parentTaskSearchControl.enable();
      const currentDate = new Date().toISOString().substring(0, 10);
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);
      const next = nextDate.toISOString().substring(0, 10);
      endDateControl.setValue(next);
      startDateControl.setValue(currentDate);
    }
  }

  save() {
    console.log(this.taskForm);
    console.log('Saved: ' + this.taskForm.value);
    const parentCheckboxControl = this.taskForm.get(
      "parentTaskGroup.parentTaskCheckbox"
    );
    const taskNameControl = this.taskForm.get("taskName");
    const startDateControl = this.taskForm.get("parentTaskGroup.startDate");
    const endDateControl = this.taskForm.get("parentTaskGroup.endDate");
    //const parentTaskFormControl = this.taskForm.get("parentTaskGroup.parentTaskInput");
    //const parentTaskSearchControl = this.taskForm.get("parentTaskGroup.parentTaskSearch");
    const priorityRangeControl = this.taskForm.get("parentTaskGroup.priorityRange");
    this.parentTask.parentTask = taskNameControl.value;
    if (parentCheckboxControl.value && this.id == null) {
      console.log("Inside Parent Task Creation Submit Method ");
     this.http
      .post('/api/v1/projectmanager/tasks/createParentTask', this.parentTask)
      .subscribe(response => {
        console.log('response ', response);
        this.loadProjects();
        this.loadUsers();
        this.loadTasks();
        this.loadParentTasks();
        this.taskForm.reset();
      });
    } else if (this.id == null) {
      console.log("Inside New Task Creation Submit Method ");
        this.newTask.task = taskNameControl.value;
        this.newTask.startDate = startDateControl.value;
        this.newTask.endDate = endDateControl.value;
        this.newTask.priority = priorityRangeControl.value;
        this.newTask.project = this.selProject;
        this.newTask.parent = this.parentTask;
        this.newTask.user = this.userAssigned;
        this.http
      .post('/api/v1/projectmanager/tasks/createTask', this.newTask)
      .subscribe(response => {
        console.log('response ', response);
        this.loadProjects();
        this.loadUsers();
        this.loadTasks();
        this.loadParentTasks();
        this.taskForm.reset();
      });
    }
    else {
      console.log("Editing Tasksssss..." + this.id);
      this.newTask.task = taskNameControl.value;
      this.newTask.startDate = startDateControl.value;
      this.newTask.endDate = endDateControl.value;
      this.newTask.priority = priorityRangeControl.value;
      this.newTask.user = this.userAssigned;
      this.newTask.taskID = this.id;
      this.oldUserID = this.editTask.userID;
      console.log("Edit Task JSON " + JSON.stringify(this.newTask));
       this.projectService.editTask(this.oldUserID, this.newTask)
      .subscribe(response => {
        console.log('response ', response);
        this.loadProjects();
        this.loadUsers();
        this.loadTasks();
        this.loadParentTasks();
        this.taskForm.reset();
      });

    }
  }
}
