import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Settings } from './settings';

import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'RAWAI Report';
  	
  constructor(private router: Router) {}
  getTitleText() {
  	var t = "";
  	if (Settings.server) {
  		return "Host " + Settings.server.host +
  			", Board " + Settings.server.board +
  			", Project " + Settings.server.project +
  			", Label " + Settings.server.label;
  	} else {
  		return "Server settings missing";
  	}
  }
  
  ngOnInit() {
  	this.router.navigate(['/startup']);
  }
  
  goToSettingsServer() {
    this.router.navigate(['/settings/server']);
  }

  goToSettingsToken() {
    this.router.navigate(['/settings/token']);
  }

  goToSettingsClassification() {
    this.router.navigate(['/settings/classification']);
  }
}
