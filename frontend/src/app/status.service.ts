import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) { }
  
  getStatuses() : Observable<any> {
  	return this.httpClient.get("http://localhost:5000/read-statuses");
  }
}
