import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  @Input() user: any;


  constructor() { }

  ngOnInit() {
  }

  handleEdit() {
    console.log('edit button clicked');
  }

}
