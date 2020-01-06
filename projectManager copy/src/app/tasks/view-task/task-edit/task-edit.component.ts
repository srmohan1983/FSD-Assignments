import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { projection } from '@angular/core/src/render3';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/project.service';
import { Task } from 'src/app/model/task.model';
import { ViewTaskResponse } from 'src/app/model/viewTaskResponse';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Input() task?: any;
  @Output() endTaskEmitter = new EventEmitter<ViewTaskResponse>();
  childTask: ViewTaskResponse = new ViewTaskResponse();
  constructor(private router: Router,private projectService: ProjectService) { }

  ngOnInit() {

  }

  updateTask(id: number){
    this.router.navigate(['/addTask', id]);
  }

  endTask(id: number){
    console.log('Update button clicked');
    this.endTaskEmitter.emit(this.task);
    
  }

}
