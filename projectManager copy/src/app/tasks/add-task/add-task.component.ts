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

  users: User[] = [
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

  tasks: Task[] = [
    {
      Project: "Trace1",
      Task: "Dev1",
      Priority: "10",
      ParentTask: "Coding"
    },
    {
      Project: "Trace1",
      Task: "Dev2",
      Priority: "20",
      ParentTask: "Coding"
    },
    {
      Project: "Trace1",
      Task: "Dev3",
      Priority: "30",
      ParentTask: "Coding"
    },
    {
      Project: "Trace1",
      Task: "Dev4",
      Priority: "40",
      ParentTask: "Coding"
    }
  ];

  taskForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      projectSearch: ["", [Validators.required]],
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
  }

  onSelectProject(project: Project): void {
    const projectFormControl = this.taskForm.get("projectSearch");
    projectFormControl.setValue(project.Project);
  }

  onSelectTask(task: Task): void {
    const parentTaskFormControl = this.taskForm.get("parentTaskGroup.parentTaskInput");
    parentTaskFormControl.setValue(task.ParentTask);
  }

  onSelectUser(user: User): void {
    const userFormControl = this.taskForm.get("userSearch");
    userFormControl.setValue(user.firstName);
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
    startDateControl.disable();
    endDateControl.disable();
    startDateControl.setValue("");
    endDateControl.setValue("");
    parentTaskFormControl.setValue("");
    parentTaskSearchControl.disable();
    priorityRangeControl.disable();
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
}
