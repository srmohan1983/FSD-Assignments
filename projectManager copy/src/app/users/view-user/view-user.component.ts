import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/project.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { ToastrService } from 'src/app/common/toastr.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  @Input() user: any;
  users: any = [];
  @Output() editUser = new EventEmitter<User>();

  constructor(private projectService: ProjectService,
    private router: Router,
    private toastr:ToastrService) { }

  ngOnInit() {
  }

  handleEdit() {
    console.log('edit button clicked');
    this.editUser.emit(this.user);
  }

  loadUsers() {
    this.projectService.getUsers().subscribe(
      data => {
        console.log(data);
        this.users = data;
      },
      error => console.log(error)
    );
  }

  deleteUser(id: number) {
    this.projectService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success("User Deleted");
          this.loadUsers();

        },
        (error => this.toastr.error("Error.Check Logs")));
  }

}
