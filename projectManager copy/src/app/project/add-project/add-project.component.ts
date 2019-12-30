import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { Project } from 'src/app/model/project.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/project.service';
import { DatePipe } from '@angular/common';
import { ProjectsResponse } from 'src/app/model/projectsResponse';

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
              private datepipe: DatePipe) { }


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
        this.loadProjects();
        this.loadUsers();
        this.projectForm.reset();
      });
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
      .subscribe(response => console.log(response), error => console.log(error));
     this.projectForm.reset();
     this.loadProjects();
     this.loadUsers();
     this.updatedProject = new ProjectsResponse();
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




}
