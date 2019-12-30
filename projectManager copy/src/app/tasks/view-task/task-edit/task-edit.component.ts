import { Component, OnInit, Input } from '@angular/core';
import { projection } from '@angular/core/src/render3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Input() task?: any;
  constructor(private router: Router) { }

  ngOnInit() {

  }

  updateTask(id: number){
    this.router.navigate(['/addTask', id]);
  }

}
