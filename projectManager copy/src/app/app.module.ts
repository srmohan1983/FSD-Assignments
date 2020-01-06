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
import { ToastrService } from './common/toastr.service';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { TaskEditComponent } from './tasks/view-task/task-edit/task-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { SortByPipe } from './sort-by.pipe';
import { DatePipe } from '@angular/common';

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
    TaskEditComponent,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatePipe,ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
