import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private httpClient: HttpClient) { }
  
  getActiveSprints(): Observable<any> {
    return this.httpClient.get("http://localhost:5000/read-active-sprints");
  }
  
  getJirasInSprint(sprintId: any): Observable<any> {
    return this.httpClient.get("http://localhost:5000/read-jiras/" + sprintId);
  }
  
}
