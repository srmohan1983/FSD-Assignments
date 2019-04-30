import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:3000';

  getVideoLists() {
    return this.httpClient.get(this.baseUrl + '/youtube');
  }

}
