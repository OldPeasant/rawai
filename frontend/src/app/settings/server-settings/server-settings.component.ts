import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ServerSettingsService } from '../../settings/server-settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-settings',
  imports: [ FormsModule ],
  templateUrl: './server-settings.component.html',
  styleUrl: './server-settings.component.scss'
})
export class ServerSettingsComponent implements OnInit {

	host: string = "";
	board: string = "";
	project: string = "";
	label: string = "";
	jiraLinkPrefix: string = "";

	constructor(private router: Router, private serverSettingsService: ServerSettingsService) {}

	ngOnInit() {
			this.serverSettingsService.getServerSettings().subscribe({
			next: (data) => {
				if (Object.keys(data).length == 0) {
					this.router.navigate(['/settings/server']);
				} else {
					this.host = data.host;
					this.board = data.board;
					this.project = data.project;
					this.label = data.label;
					this.jiraLinkPrefix = data.jiraLinkPrefix;
					
				}
			},
			error: (error) => {
				console.error("There was an error getting server settings:");
				console.error(error)
			},
			complete: () => {
			}
		});
	
	}

	cancel() {
		this.router.navigate(['/startup']);
	}

	save() {
		this.serverSettingsService.saveServerSettings(
			{
				'host': this.host,
				'board': this.board,
				'project': this.project,
				'label': this.label,
				'jiraLinkPrefix': this.jiraLinkPrefix
			}
		).subscribe({
			next: (data) => {
			},
			error: (error) => {
				console.error("save server settings, error:");
				console.error(error);
			},
			complete: () => {
				this.router.navigate(['/startup']);
			}
		});
	}
}
