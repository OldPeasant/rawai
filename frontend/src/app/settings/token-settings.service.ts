import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenSettingsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }


  getToken(): Observable<any> {
	return this.httpClient.get("http://localhost:4201/settings/get-token", {headers: this.headers});
  }
  
  saveToken(token: string): Observable<any> {
  	var json = {"token": token}
  	return this.httpClient.post("http://localhost:4201/settings/set-token", json, {headers: this.headers} );
  }
}
