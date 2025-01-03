import { Component, OnInit } from '@angular/core';
import { ServerSettingsService } from '../settings/server-settings.service'
import { TokenSettingsService } from '../settings/token-settings.service'
import { StatusService } from '../status.service';
import { ClassificationSettingsService } from '../settings/classification-settings.service'
import { Router } from '@angular/router';
import { Settings } from '../settings';

@Component({
  selector: 'app-startup',
  imports: [],
  templateUrl: './startup.component.html',
  styleUrl: './startup.component.scss'
})
export class StartupComponent implements OnInit {

	settingsServerOk = false;
	settingsTokenOk = false;
	settingsClassificationOk = false;
	
	constructor(
		private router: Router, 
		private serverSettingsService: ServerSettingsService,
		private tokenSettingsService: TokenSettingsService,
		private statusService: StatusService,
		private classificationSettingsService: ClassificationSettingsService
	) {

	}

	check_server() {
		var ok_to_proceed = false;
		if (Object.keys(Settings.server).length > 0) {
			this.check_token();
			return;
		}

		this.serverSettingsService.getServerSettings().subscribe({
			next: (data) => {
				if (Object.keys(data).length == 0) {
					this.router.navigate(['/settings/server']);
				} else {
					for (var value in data) {
						Settings.server[value] = data[value];
					}
					ok_to_proceed = true;
					this.settingsServerOk = true;
				}
			},
			error: (error) => {
				console.error("There was an error getting server settings:");
				console.error(error)
			},
			complete: () => {
				if (ok_to_proceed) {
					this.check_token();
				}
			}
		});
	}

	check_token() {
		var ok_to_proceed = false;
		if (Settings.token.length > 0) {
			this.check_statuses();
			return;
		}

		this.tokenSettingsService.getToken().subscribe({
			next: (data) => {
				if (data == null || data.length == 0 || data.token == null) {
					this.router.navigate(['/settings/token']);
				} else {
					Settings.token = data['token'];
					ok_to_proceed = true;
					this.settingsTokenOk = true;
				}
			},
			error: (error) => {
				console.error("There was an error getting the token:");
				console.error(error)
			},
			complete: () => {
				if (ok_to_proceed) {
					this.check_statuses();
				}
			}
		});
	}

	check_statuses() {
		if (Object.keys(Settings.statuses).length > 0) {
			this.check_classification();
		}
		this.statusService.getStatuses().subscribe({
			next: (data) => {
				Settings.statuses = data;
			},
			error: (error) => {
				console.error("Error getting statuses");
				console.error(error);
			},
			complete: () => {
				this.check_classification();
			}
		});
	}
	
	check_classification() {
		var ok_to_proceed = false;
		if (Object.keys(Settings.classification).length > 0) {
			this.router.navigate(['query-current-sprint']);
			return;
		}

		this.classificationSettingsService.getClassificationSettings().subscribe({
			next: (data) => {
				if (Object.keys(data).length == 0) {
					this.router.navigate(['/settings/classification']);
				} else {
					for (var value in data) {
						Settings.classification[value] = data[value];
					}
					ok_to_proceed = true;
					this.settingsClassificationOk = true;
				}
			},
			error: (error) => {
				console.error("There was an error getting classification settings:");
				console.error(error)
			},
			complete: () => {
				if (ok_to_proceed) {
					this.router.navigate(['/query-current-sprint']);
				}
			}
		});
	}

	ngOnInit() {
		this.check_server();
	}
}
