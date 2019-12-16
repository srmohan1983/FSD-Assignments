import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { Project } from 'src/app/model/project.model';

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



  projects : Project[] = [
    {
      Project: "Trace1",
      TotalTasks: "25",
      CompletedTasks:"10",
      StartDate: "2019-12-01",
      EndDate: "2019-12-31",
      Priority: "30"
    },
    {   Project: "Trace2",
    TotalTasks: "35",
    CompletedTasks:"5",
    StartDate: "2019-11-01",
    EndDate: "2019-11-31",
    Priority: "25"},
    {
      Project: "Trace3",
      TotalTasks: "15",
      CompletedTasks:"2",
      StartDate: "2019-10-01",
      EndDate: "2019-10-31",
      Priority: "20"
    },
    {
      Project: "Trace4",
      TotalTasks: "10",
      CompletedTasks:"1",
      StartDate: "2019-09-01",
      EndDate: "2019-09-31",
      Priority: "30"
    },
    {
      Project: "Trace5",
      TotalTasks: "50",
      CompletedTasks:"10",
      StartDate: "2019-08-01",
      EndDate: "2019-08-31",
      Priority: "25"
    }
  ];

  users : User[] = [
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

  selectedUser: User;
  projectForm: FormGroup;
  constructor(private fb: FormBuilder) { }


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
      console.log("End Date Less than Start Date");
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
  }



}
