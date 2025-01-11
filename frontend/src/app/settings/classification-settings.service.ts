import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClassificationSettingsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private httpClient: HttpClient) { }
  
  getClassificationSettings(): Observable<any> {
  	return this.httpClient.get("http://localhost:4201/settings/get-classification");
  }
  
  saveClassificationSettings(json: any): Observable<any> {
  	return this.httpClient.post("http://localhost:4201/settings/set-classification", json, {headers: this.headers} );
  }
}
