import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = '/api/v1/projectmanager/users';
  private projectBaseUrl = '/api/v1/projectmanager/projects';
  private taskBaseUrl = '/api/v1/projectmanager/tasks';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get('/api/v1/projectmanager/getUsers');
  }

  createUser(users: Object): Observable<Object> {
    return this.http.post('/api/v1/projectmanager/createUser', users);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }


  editUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }


  getProjects(): Observable<any> {
    return this.http.get('/api/v1/projectmanager/getProjects');
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(`${this.projectBaseUrl}/${id}`);
  }


  editProject(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.projectBaseUrl}/${id}`, value);
  }

  getTasks(): Observable<any> {
    return this.http.get('/api/v1/projectmanager/tasks/getTasks');
  }

  getParentTasks(): Observable<any> {
    return this.http.get('/api/v1/projectmanager/tasks/getParentTasks');
  }

  getTasksById(id: number): Observable<any> {
    return this.http.get(`${this.taskBaseUrl}/${id}`);
  }

  editTask(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.taskBaseUrl}/${id}`, value);
  }

}
