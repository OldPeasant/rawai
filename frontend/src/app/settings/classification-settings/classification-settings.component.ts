import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgFor, NgIf, NgClass, KeyValuePipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Settings } from '../../settings';
import { ClassificationModel, ClassificationRule, Condition, CONDITION_TYPE_LABEL, CONDITION_TYPES, Lane } from '../../classification-model';
import { ClassificationSettingsService } from '../../settings/classification-settings.service'

import { arrayMoveLeft, arrayMoveRight } from '../../util';

@Component({
  selector: 'app-classification-settings',
  imports: [ FormsModule, NgFor, NgIf ],
  templateUrl: './classification-settings.component.html',
  styleUrl: './classification-settings.component.scss'
})
export class ClassificationSettingsComponent implements OnInit {

	CONDITION_TYPES:any = [];
	classificationModel: ClassificationModel = new ClassificationModel({'lanes':[], 'classificationRules':[]});
	statuses = Settings.statuses;
	
	constructor(private router: Router, private classificationSettingsService: ClassificationSettingsService) {}
	
	ngOnInit() {
		this.CONDITION_TYPES = CONDITION_TYPES;
		this.classificationSettingsService.getClassificationSettings().subscribe({
			next: (data) => {
				this.classificationModel = new ClassificationModel(data);
			},
			error: (error) => {
				console.error("Error getting classification settings");
				console.error(error);
			},
			complete: () => {
				
			}
		});
	}
	
	getConditionTypeLabel(ct: number) {
		return CONDITION_TYPE_LABEL[ct];
	} 
	cancel() {
		this.router.navigate(['/startup']);
	}
	
	save() {
		this.classificationSettingsService.saveClassificationSettings(this.classificationModel.toJson()).subscribe({
			next: (data) => {
			},
			error: (error) => {
				console.error("save classification, error:");
				console.error(error);
			},
			complete: () => {
				Settings.classification = {};
				this.router.navigate(['/startup']);
			}
		});
	}
	
	addLane() {
		var maxIndex = 0;
		for (let l of this.classificationModel.lanes) {
			if (l.id > maxIndex) {
				maxIndex = l.id;
			}
		}
		this.classificationModel.lanes.push(new Lane({'id': (maxIndex + 1), 'label' : 'New lane', 'showIfEmpty' : false}));
	}
	
	deleteLane(lane: Lane) {
		var ix: number = this.classificationModel.lanes.indexOf(lane);
		this.classificationModel.lanes.splice(ix, 1);
	}
	
	moveLaneUp(lane: Lane) {
		arrayMoveLeft(this.classificationModel.lanes, lane);
	}
	
	moveLaneDown(lane:Lane) {
		arrayMoveRight(this.classificationModel.lanes, lane);
	}
	
	addClassificationRule() {
		this.classificationModel.classificationRules.push(new ClassificationRule({'laneId':{}, 'conditions':[]}));
	}
	
	deleteClassificationRule(classificationRule: ClassificationRule) {
		var ix: number = this.classificationModel.classificationRules.indexOf(classificationRule);
		this.classificationModel.classificationRules.splice(ix, 1);
	}
	
	moveClassificationRuleUp(classificationRule: ClassificationRule) {
		arrayMoveLeft(this.classificationModel.classificationRules, classificationRule);
	}
	
	moveClassificationRuleDown(classificationRule: ClassificationRule) {
		arrayMoveRight(this.classificationModel.classificationRules, classificationRule);
	}
	
	addCondition(classificationRule: ClassificationRule) {
		classificationRule.conditions.push(new Condition({}));
	}
	
	deleteCondition(conditionsList: any[], cond: any) {
		var ix = conditionsList.indexOf(cond);
		conditionsList.splice(ix, 1);
	}
}
