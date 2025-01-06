import { Component, OnInit, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Settings } from '../settings';

@Component({
  selector: 'app-jira-ticket',
  imports: [ NgIf ],
  templateUrl: './jira-ticket.component.html',
  styleUrl: './jira-ticket.component.scss'
})
export class JiraTicketComponent {

	@Input() jiraData: any;
	@Input() highlightIfNotAssigned: boolean = false;
	@Input() highlightIfNotAssignedStyle: string = "";
	@Input() highlightAll: boolean = false;
	@Input() highlightAllStyle: string = "";
	
	customStyle = "";
	
	ngOnInit() {
		var cs = "";
		if (this.highlightIfNotAssigned && this.highlightIfNotAssignedStyle && !this.getValue(["fields", "assignee", "displayName"])) {
			cs += this.highlightIfNotAssignedStyle;
		}
		if (cs.length > 0 && ! cs.endsWith(';')) {
			cs += ";";
		}
		if (this.highlightAll && this.highlightAllStyle) {
			cs += this.highlightAllStyle;
		}
		console.info("Jira " + this.jiraData.key + ": " + cs); 
		console.info("(" + this.highlightIfNotAssigned + ", " + this.highlightIfNotAssignedStyle + ")");
		this.customStyle = cs;
	}
	
	getValue(fields: string[]) {
		var v = this.jiraData;
		for (let f of fields) {
			if (v) {
				v = v[f];
			} else {
				return "";
			}
		}
		return v;
	}
	
	goToLink(){
		var jlp:string = Settings.server.jiraLinkPrefix;
		if (! jlp.endsWith("/")) {
			jlp = jlp + "/";
		}
    	window.open(jlp + this.jiraData.key, "_blank");
	}
}
