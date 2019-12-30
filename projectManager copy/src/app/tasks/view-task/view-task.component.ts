import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/project.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  constructor(private route: ActivatedRoute,private fb: FormBuilder,
    private projectService: ProjectService,
              private http: HttpClient,
              private router: Router,
              private datepipe: DatePipe) { }

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

   onSelectProject(project: Project): void {
    const projectFormControl = this.viewTaskForm.get("projectSearch");
    projectFormControl.setValue(project.projectTitle);
    this.selProject.projectID = project.projectID;
    //this.id = this.route.snapshot.params['id'];

    this.projectService.getProjectById(this.selProject.projectID)
      .subscribe(data => {
        console.log("Data before Service Call" + data)
        this.respTask = data;
        console.log(" Data Json " + JSON.stringify(data));
        console.log(" Resp Task ID " + this.respTask.taskID);
      }, error => console.log(error));

  }

}
