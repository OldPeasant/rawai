import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TokenSettingsService } from '../../settings/token-settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-settings',
  imports: [ FormsModule ],
  templateUrl: './token-settings.component.html',
  styleUrl: './token-settings.component.scss'
})
export class TokenSettingsComponent implements OnInit {

	token: string = "";
	
	constructor (private router: Router, private tokenSettingsService: TokenSettingsService) {
	
	}
	
	ngOnInit() {
			this.tokenSettingsService.getToken().subscribe({
			next: (data) => {
				if (data == null || data.length == 0 || data.token == null) {
					// this.token remains empty
				} else {
					this.token = data['token'];
				}
			},
			error: (error) => {
				console.error("There was an error getting the token:");
				console.error(error)
			},
			complete: () => {
				//this.router.navigate(['/startup']);
			}
		});
	
	}
	
	cancel() {
		this.router.navigate(['/startup']);
	}

	save() {
		this.tokenSettingsService.saveToken(this.token).subscribe({
			next: (data) => {
			},
			error: (error) => {
				console.error("save token, error:");
				console.error(error);
			},
			complete: () => {
				this.router.navigate(['/startup']);
			}
		});
	}
	
}
