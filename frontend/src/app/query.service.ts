import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private httpClient: HttpClient) { }
  
  getActiveSprints(): Observable<any> {
    return this.httpClient.get("http://localhost:4201/read-active-sprints");
  }
  
  getJirasInSprint(sprintId: any): Observable<any> {
    return this.httpClient.get("http://localhost:4201/read-jiras/" + sprintId);
  }
  
}
