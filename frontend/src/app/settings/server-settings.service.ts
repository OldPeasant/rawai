import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServerSettingsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  getServerSettings(): Observable<any> {
	return this.httpClient.get("http://localhost:4201/settings/get-server-info");
  }

  saveServerSettings(json: any): Observable<any> {
    return this.httpClient.post("http://localhost:4201/settings/set-server-info", json, {headers: this.headers} );
  }
}
