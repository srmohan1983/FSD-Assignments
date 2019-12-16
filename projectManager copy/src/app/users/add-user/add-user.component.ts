import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  users = [
    {
      firstName: "Mohan",
      lastName: "Kumar",
      employeeId: "101"
    },
    { firstName: "Preetha", lastName: "Raman", employeeId: "102" },
    {
      firstName: "Adhvik",
      lastName: "Mohan",
      employeeId: "103"
    },
    {
      firstName: "Susila",
      lastName: "Rengaswamy",
      employeeId: "104"
    },
    {
      firstName: "Rengaswamy",
      lastName: "Ramasamy",
      employeeId: "105"
    }
  ];

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      empId: ["", [Validators.required]]
    });


  }

  save() {
    console.log(this.userForm);
    console.log("Saved: " + this.userForm.get("firstName").value);
  }


}
