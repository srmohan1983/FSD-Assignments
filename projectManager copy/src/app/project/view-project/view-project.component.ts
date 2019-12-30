import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { ProjectsResponse } from 'src/app/model/projectsResponse';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  @Input() project: any;
  //@Input() user: any;
  @Output() updateProject = new EventEmitter<ProjectsResponse>();
  childProject: ProjectsResponse = new ProjectsResponse();

  constructor() { }

  ngOnInit() {
    console.log("Project Object " + JSON.stringify(this.project));
    this.childProject = this.project;
  }

  handleUpdate() {
    console.log('Update button clicked');
    this.updateProject.emit(this.project);
  }

}
