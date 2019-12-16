import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  @Input() project: any;
  @Input() user: any;
  constructor() { }

  ngOnInit() {
  }

}
