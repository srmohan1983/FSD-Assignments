import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/project.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProjectsResponse } from 'src/app/model/projectsResponse';
import { ViewTaskResponse } from 'src/app/model/viewTaskResponse';
import { ToastrService } from 'src/app/common/toastr.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit  {

  id: number;
  viewTaskForm: FormGroup;
  projects: any=[];
  tasks: any[];
  selProject: Project = new Project();
  respTask: any=[];
  endTaskRequest: Task = new Task();
  constructor(private route: ActivatedRoute,private fb: FormBuilder,
    private projectService: ProjectService,
              private http: HttpClient,
              private router: Router,
              private datepipe: DatePipe,
              private toastr:ToastrService) { }

  ngOnInit() {
    this.viewTaskForm = this.fb.group({
      projectSearch: ["", [Validators.required]]
    });
    this.loadProjects();
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

  loadTasks() {
    this.projectService.getTasks().subscribe(
      data => {
        console.log(data);
        this.tasks = data;
      },
      error => console.log(error)
    );
  }

   onSelectProject(project: ProjectsResponse): void {
    const projectFormControl = this.viewTaskForm.get("projectSearch");
    projectFormControl.setValue(project.project.projectTitle);
    this.selProject.projectID = project.project.projectID;
    //this.id = this.route.snapshot.params['id'];

    this.projectService.getProjectById(this.selProject.projectID)
      .subscribe(data => {
        console.log("Data before Service Call" + data)
        this.respTask = data;
        console.log(" Data Json " + JSON.stringify(data));
        console.log(" Resp Task ID " + this.respTask.taskID);
      }, error => console.log(error));

  }

  sortByStartDate(){
    this.respTask.sort(sortByStartDate);
  };

  sortByEndDate(){
    this.respTask.sort(sortByEndDate);
  };

  sortByPriority(){
    this.respTask.sort(sortByPriority);
  };

  sortByTasksCompleted(){
    this.respTask.sort(sortByTasksCompleted);
  };

  onEndTaskUpdate(taskResponse: ViewTaskResponse): void {
    console.log("End Task Update Event Emitted" + JSON.stringify(taskResponse));
    this.endTaskRequest.taskID = taskResponse.taskID;
    console.log("Task Id for Task End " + this.endTaskRequest.taskID);
     this.projectService.endTasksById(this.endTaskRequest.taskID, this.endTaskRequest)
      .subscribe(response => {
        console.log('response ', response);
        this.toastr.success("Task Updated");
        this.loadProjects();
      },
      (error => this.toastr.error("Error.Check Logs")));  
  }

}
function sortByStartDate(s1: ViewTaskResponse, s2: ViewTaskResponse) {
  if (s1.startDate > s2.startDate ) return 1
  else if(s1.startDate === s2.startDate ) return 0
  else return -1
}


function sortByEndDate(s1: ViewTaskResponse, s2: ViewTaskResponse) {
  if (s1.endDate > s2.endDate ) return 1
  else if(s1.endDate === s2.endDate ) return 0
  else return -1
}

function sortByPriority(s1: ViewTaskResponse, s2: ViewTaskResponse) {
  if (s1.priority > s2.priority ) return 1
  else if(s1.priority === s2.priority ) return 0
  else return -1
}

function sortByTasksCompleted(s1: ViewTaskResponse, s2: ViewTaskResponse) {
  if (s1.status > s2.status ) return 1
  else if(s1.status === s2.status ) return 0
  else return -1
}
