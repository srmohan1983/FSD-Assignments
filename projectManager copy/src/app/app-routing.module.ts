import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { SearchModalComponent } from './project/search-modal/search-modal.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';

const routes: Routes = [{ path: 'addUser', component: AddUserComponent },
{ path: '', redirectTo: 'addProject', pathMatch: 'full'},
{ path: 'addProject', component: AddProjectComponent },
{ path: 'addProject/searchModal', component: SearchModalComponent },
{ path: 'addTask', component: AddTaskComponent },
{ path: 'viewTask', component: ViewTaskComponent },
{ path: 'viewTask/addTask', component: AddTaskComponent }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
