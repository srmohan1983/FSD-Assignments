import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { Project } from 'src/app/model/project.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/project.service';
import { DatePipe } from '@angular/common';
import { ProjectsResponse } from 'src/app/model/projectsResponse';
import { ToastrService } from 'src/app/common/toastr.service';

function dateCompare(c: AbstractControl): {[key : string]: boolean} | null {

    const startDate = c.get('startDate');
    const endDate = c.get('endDate');
    if (endDate.value < startDate.value) {
        return {'match' : true};
    }
    return null;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  selectedUser: User;
  projectForm: FormGroup;
  users: any = [];
  projects: any=[];
  updatedProject: ProjectsResponse = new ProjectsResponse();
  newProject: Project = new Project();
  updatedProjectRec: Project = new Project();
  projectManager: any = [];
  updatedProjectManager: User = new User();

  constructor(private fb: FormBuilder,
              private projectService: ProjectService,
              private http: HttpClient,
              private router: Router,
              private datepipe: DatePipe,
              private toastr:ToastrService) { }


  ngOnInit() {
    this.projectForm = this.fb.group({
      projectTitle: ['',[Validators.required]],
      dateGroup: this.fb.group({
      dateCheckbox: [''],
      startDate: [{value: '', disabled: true}, [Validators.required]],
      endDate: [{value: '', disabled: true}, [Validators.required]],
      }, { validator: dateCompare }),
      range: ['0'],
      managerSearch: ['']
    });
    this.loadProjects();
    this.loadUsers();
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

  dateCheckboxChecked() {
    const startDateControl = this.projectForm.get('dateGroup.startDate');
    const endDateControl = this.projectForm.get('dateGroup.endDate');
    startDateControl.enable();
    endDateControl.enable();
    const currentDate = new Date().toISOString().substring(0, 10);
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    const next = nextDate.toISOString().substring(0, 10);
    endDateControl.setValue(next);
    startDateControl.setValue(currentDate);
    if (endDateControl.value < startDateControl.value) {
      console.log('End Date Less than Start Date');
    }
    const dateCheckboxControl = this.projectForm.get('dateGroup.dateCheckbox');
    if (dateCheckboxControl.value) {
      startDateControl.disable();
      endDateControl.disable();
      startDateControl.setValue('');
      endDateControl.setValue('');
    }
  }

  onSelectManager(user: User): void {
    const managerFormControl = this.projectForm.get('managerSearch');
    managerFormControl.setValue(user.firstName);
    this.projectManager = user;
  }

  save() {
    console.log(this.projectForm);
    console.log('Saved: ' + this.projectForm.value);
    const projectTitleControl = this.projectForm.get('projectTitle');
    const startDateControl = this.projectForm.get('dateGroup.startDate');
    const endDateControl = this.projectForm.get('dateGroup.endDate');
    const rangeControl = this.projectForm.get('range');
    this.newProject.projectTitle = projectTitleControl.value;
    this.newProject.priority = rangeControl.value;
    this.newProject.startDate = startDateControl.value;
    this.newProject.endDate = endDateControl.value;
    //this.newProject.user = this.projectManager;
    this.newProject.userRecords.push(this.projectManager);
    if (this.updatedProject.project.projectID == null){

    this.http
      .post('/api/v1/projectmanager/createProject', this.newProject)
      .subscribe(response => {
        console.log('response ', response);
        this.toastr.success("Project Created");
        this.loadProjects();
        this.loadUsers();
        this.projectForm.reset();
      },
      (error => this.toastr.error("Error.Check Logs")));
  } else {
     console.log('Update Button Submit Action' + this.updatedProject.project.projectID);
     const projectTitleControl = this.projectForm.get('projectTitle');
     const startDateControl = this.projectForm.get('dateGroup.startDate');
     const endDateControl = this.projectForm.get('dateGroup.endDate');
     const rangeControl = this.projectForm.get('range');
     this.updatedProjectRec.projectTitle = projectTitleControl.value;
     this.updatedProjectRec.priority = rangeControl.value;
     this.updatedProjectRec.startDate = startDateControl.value;
     this.updatedProjectRec.endDate = endDateControl.value;
     this.updatedProjectRec.userRecords.push(this.updatedProjectManager);
     console.log("Passed in Project Rec for Update" + JSON.stringify(this.updatedProjectRec));

     this.projectService.editProject(this.updatedProject.project.projectID, this.updatedProjectRec)
      .subscribe(response => { console.log(response);
        this.toastr.success("Project Updated");
     this.projectForm.reset();
     this.loadProjects();
     this.loadUsers();
     this.updatedProject = new ProjectsResponse();
   }, (error => this.toastr.error("Error.Check Logs")));
  }
}


  onUpdate(updatedProject: ProjectsResponse): void {
    console.log("Emitted Event from Update Button" + JSON.stringify(updatedProject));
    this.updatedProject = updatedProject;
    console.log("Emitted Event after Assginment" + JSON.stringify(this.updatedProject.project.projectTitle));
    const projectTitleControl = this.projectForm.get('projectTitle');
    const startDateControl = this.projectForm.get('dateGroup.startDate');
    const endDateControl = this.projectForm.get('dateGroup.endDate');
    const rangeControl = this.projectForm.get('range');
    const managerModalControl = this.projectForm.get('managerSearch');
    //const submitButtonControl = this.userForm.get('submitButton');
    projectTitleControl.setValue(updatedProject.project.projectTitle);
    startDateControl.setValue(this.datepipe.transform(updatedProject.project.startDate, 'yyyy-MM-dd'));
    console.log('Start Date Control Value ' + startDateControl.value);
    endDateControl.setValue(this.datepipe.transform(updatedProject.project.endDate, 'yyyy-MM-dd'));
    console.log('End Date Control Value ' + endDateControl.value);
    console.log('Dates Setup Add Project Component');
    rangeControl.setValue(updatedProject.project.priority);
    managerModalControl.setValue(updatedProject.project.userRecords[0].firstName);
    this.updatedProjectManager = updatedProject.project.userRecords[0];
    console.log("Updated Project ProjectID" + updatedProject.project.projectID);
  }

  sortByStartDate(){
    this.projects.sort(sortByStartDate);
  };

  sortByEndDate(){
    this.projects.sort(sortByEndDate);
  };

  sortByPriority(){
    this.projects.sort(sortByPriority);
  };

  sortByTasksCompleted(){
    this.projects.sort(sortByTasksCompleted);
  };



}

function sortByStartDate(s1: ProjectsResponse, s2: ProjectsResponse) {
  if (s1.project.startDate > s2.project.startDate ) return 1
  else if(s1.project.startDate === s2.project.startDate ) return 0
  else return -1
}


function sortByEndDate(s1: ProjectsResponse, s2: ProjectsResponse) {
  if (s1.project.endDate > s2.project.endDate ) return 1
  else if(s1.project.endDate === s2.project.endDate ) return 0
  else return -1
}

function sortByPriority(s1: ProjectsResponse, s2: ProjectsResponse) {
  if (s1.project.priority > s2.project.priority ) return 1
  else if(s1.project.priority === s2.project.priority ) return 0
  else return -1
}

function sortByTasksCompleted(s1: ProjectsResponse, s2: ProjectsResponse) {
  if (s1.completedTasksCount > s2.completedTasksCount ) return 1
  else if(s1.completedTasksCount === s2.completedTasksCount ) return 0
  else return -1
}