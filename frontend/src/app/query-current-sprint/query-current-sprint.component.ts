import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { QueryService } from '../query.service';
import { SprintViewModel } from '../query-view-model';
import { ClassificationModel } from '../classification-model';
import { Settings } from '../settings';

import { JiraTicketComponent } from '../jira-ticket/jira-ticket.component';


@Component({
  selector: 'app-query-current-sprint',
  imports: [ NgFor, NgIf, JiraTicketComponent, RouterLink ],
  templateUrl: './query-current-sprint.component.html',
  styleUrl: './query-current-sprint.component.scss'
})
export class QueryCurrentSprintComponent implements OnInit {
	reloadTimestamp = "";
	activeSprints : Array<any> = [];
	jirasBySprintId: any = {};
	sprintViewModels: SprintViewModel[] = [];
	sprintsToBeLoaded = 0;
	hourglassVisible = false;

	constructor(private router: Router, private queryService: QueryService) {
	}
	
	ngOnInit() {
		if (!Settings.server.host) {
			this.router.navigate(['/startup']);
		} else {
			this.loadData();
		}
	}
	
	loadData() {
		this.reloadTimestamp = new Date().toLocaleString("de-DE");
    
	
		this.activeSprints = [];
		this.sprintViewModels = [];
		this.jirasBySprintId = {};
		this.hourglassVisible = true;
		this.queryService.getActiveSprints().subscribe({
			next: (data) => {
				this.activeSprints = data;
				this.sprintsToBeLoaded = this.activeSprints.length;
			},
			error: (error) => {
				console.error(error);
				this.sprintsToBeLoaded = 0;
			},
			complete: () => {
				for (let s of this.activeSprints) {
					this.loadJirasInSprint(s);
				}
			}
		});
	}
	
	loadJirasInSprint(sprint: any) {
		this.queryService.getJirasInSprint(sprint.id).subscribe({
			next: (data) => {
				this.jirasBySprintId[sprint.id] = data;
			},
			error: (error) => {
				console.error(error);
				this.sprintsToBeLoaded -= 1;
				if (this.sprintsToBeLoaded == 0) {
					this.hourglassVisible = false;
				}
			},
			complete: () => {
				var classificationModel = new ClassificationModel(Settings.classification);
				var svm = new SprintViewModel(classificationModel, sprint, this.jirasBySprintId[sprint.id]);
				this.sprintViewModels.push(
					svm
				);
				this.sprintsToBeLoaded -= 1;
				if (this.sprintsToBeLoaded == 0) {
					this.hourglassVisible = false;
				}
			}
		});
	}
	
}
