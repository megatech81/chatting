// Example service using the configuration
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.serverUrl}/api/data`);
  }
}
