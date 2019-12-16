import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { SearchModalComponent } from './project/search-modal/search-modal.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { TaskEditComponent } from './tasks/view-task/task-edit/task-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ViewUserComponent,
    FilterPipe,
    AddProjectComponent,
    ViewProjectComponent,
    SearchModalComponent,
    AddTaskComponent,
    ViewTaskComponent,
    TaskEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
