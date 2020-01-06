import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { ProjectService } from "src/app/project.service";
import { Observable } from "rxjs";
import { User } from "src/app/model/user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/common/toastr.service';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  users: any = [];
  //user: User = new User();
  editedUser: User = new User();
  sortBy: string = 'FirstName';
  sortedUsers: any = [];


  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private http: HttpClient,
    private toastr:ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      employeeID: ["", [Validators.required]]
    });
    this.loadUsers();
    

  }

  loadUsers() {
    this.projectService.getUsers().subscribe(
      data => {
        console.log(data);
        this.users = data;
        this.users.sort()
      },
      error => console.log(error)
    );
  }

  save() {
    console.log(this.userForm);
    console.log("Saved: " + this.userForm.value);
    if (this.editedUser.userID == null){
    this.http
      .post('/api/v1/projectmanager/createUser', this.userForm.value)
      .subscribe(response => {
        console.log('response ', response);
        this.loadUsers();
        this.toastr.success("User Saved");
        this.userForm.reset();
        //this.router.navigateByUrl('/addUser');
      },
      (error => this.toastr.error("Error.Check Logs")));
  }
   else {
    console.log("Edit Button Submit Action" + this.editedUser.userID);
    this.projectService.editUser(this.editedUser.userID, this.userForm.value)
      .subscribe(response => { 
        console.log(response)
    this.userForm.reset();
    this.loadUsers();
    this.toastr.success("User Updated");
    this.editedUser = new User();
   },
   (error => this.toastr.error("Error.Check Logs")));
  }
}

  onEdit(editedUser: User):void {
    this.editedUser = editedUser;
    console.log("Edited User" + this.editedUser.userID);
    const firstNameControl = this.userForm.get('firstName');
    const lastNameControl = this.userForm.get('lastName');
    const empIDControl = this.userForm.get('employeeID');
    //const submitButtonControl = this.userForm.get('submitButton');
    firstNameControl.setValue(editedUser.firstName);
    lastNameControl.setValue(editedUser.lastName);
    empIDControl.setValue(editedUser.employeeID);

  }

  sortByFirstName() {
    this.users.sort(sortbyFirstName);
  }

  sortByLastName() {
    this.users.sort(sortbyLastName);
  }

  sortByEmpId() {
    this.users.sort(sortByEmpId);
  }
}

function sortbyFirstName(s1: User, s2: User) {
  if (s1.firstName > s2.firstName ) return 1
  else if(s1.firstName === s2.firstName ) return 0
  else return -1
}


function sortbyLastName(s1: User, s2: User) {
  if (s1.lastName > s2.lastName ) return 1
  else if(s1.lastName === s2.lastName ) return 0
  else return -1
}

function sortByEmpId(s1: User, s2: User) {
  if (s1.employeeID > s2.employeeID ) return 1
  else if(s1.employeeID === s2.employeeID ) return 0
  else return -1
}