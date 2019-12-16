import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  projects: Project[] = [
    {
      Project: "Trace1",
      TotalTasks: "25",
      CompletedTasks: "10",
      StartDate: "2019-12-01",
      EndDate: "2019-12-31",
      Priority: "30"
    },
    {
      Project: "Trace2",
      TotalTasks: "35",
      CompletedTasks: "5",
      StartDate: "2019-11-01",
      EndDate: "2019-11-31",
      Priority: "25"
    },
    {
      Project: "Trace3",
      TotalTasks: "15",
      CompletedTasks: "2",
      StartDate: "2019-10-01",
      EndDate: "2019-10-31",
      Priority: "20"
    },
    {
      Project: "Trace4",
      TotalTasks: "10",
      CompletedTasks: "1",
      StartDate: "2019-09-01",
      EndDate: "2019-09-31",
      Priority: "30"
    },
    {
      Project: "Trace5",
      TotalTasks: "50",
      CompletedTasks: "10",
      StartDate: "2019-08-01",
      EndDate: "2019-08-31",
      Priority: "25"
    }
  ];


  tasks: Task[] = [
    {
      Project:"Trace5",
      Task: "T1-Transformation",
      ParentTask: "Analysis",
      Priority:"5"
      //StartDate: "2019-12-01",
      //EndDate: "2019-12-31"
    },
    {
      Project:"Trace5",
      Task: "T2-Transformation",
      ParentTask: "Analysis",
      Priority:"10"
      //StartDate: "2019-06-01",
      //EndDate: "2019-10-31"},
    },
    {
      Project:"Trace5",
      Task: "T3-Transformation",
      ParentTask: "Development",
      Priority:"25"
      //StartDate: "2019-02-01",
      //EndDate: "2019-05-31"
    }
  ];

  viewTaskForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.viewTaskForm = this.fb.group({
      projectSearch: ["", [Validators.required]]
    });
  }

  onSelectProject(project: Project): void {
    const projectFormControl = this.viewTaskForm.get("projectSearch");
    projectFormControl.setValue(project.Project);
  }

}
