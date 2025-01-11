

export class Lane {
	id: string;
	label: string;
	showIfEmpty : boolean;
	highlightIfNotAssigned : boolean;
	highlightIfNotAssignedStyle : string;
	highlightAll: boolean;
	highlightAllStyle: string;
	
	constructor(json: any) {
		this.id = "" + json.id;
		this.label = json.label;
		this.showIfEmpty = json.showIfEmpty;
		this.highlightIfNotAssigned = json.highlightIfNotAssigned;
		this.highlightIfNotAssignedStyle = json.highlightIfNotAssignedStyle;
		this.highlightAll = json.highlightAll;
		this.highlightAllStyle = json.highlightAllStyle;
		console.info("Loading lane: " + this.highlightIfNotAssignedStyle );
	}
	
	toJson() {
		return {
			"id": this.id,
			"label": this.label,
			"showIfEmpty": this.showIfEmpty,
			"highlightIfNotAssigned": this.highlightIfNotAssigned,
			"highlightIfNotAssignedStyle" : this.highlightIfNotAssignedStyle,
			"highlightAll" : this.highlightAll,
			"highlightAllStyle" : this.highlightAllStyle
		}
	}
}

export var DUMMY_LANE = new Lane({})

export class ClassificationModel {
	lanes: Lane[] = [];
	classificationRules : ClassificationRule[] = [];
	
	constructor(json: any) {
		var lanesJson = json["lanes"];
		var classificationRulesJson = json["classificationRules"];
		for (let lj of lanesJson) {
			this.lanes.push(new Lane(lj));
		}
		
		for (let crj of classificationRulesJson) {
			this.classificationRules.push(new ClassificationRule(crj));
		}
	}
	
	getLaneById(laneId: string): Lane {
		if (laneId == "") {
			return DUMMY_LANE
		}
		for (let lane of this.lanes) {
			
			if (lane.id == laneId) {
				return lane
			}
		}
		return new Lane({"id": -1, "label": "no lane"})
	}
	
	toJson():any {
		var lanesJson = [];
		for (let l of this.lanes) {
			lanesJson.push(l.toJson());
		}
		var classificationRulesJson = [];
		for (let cr of this.classificationRules) {
			classificationRulesJson.push(cr.toJson());
		}
		return {"lanes" : lanesJson, "classificationRules": classificationRulesJson};
	}
	
	getLane(issue: any) {
		for (let cr of this.classificationRules) {
			if (cr.matches(issue)) {
				var laneId = cr.laneId;
				for (let l of this.lanes) {
					if (l.id == laneId) {
						return l;
					}
				}
				return null;
			}
		}
		return null;
	}
}

export class ClassificationRule {
	conditions : Condition[] = [];
	laneId: string = "";
	
	constructor(json: any) {
		this.laneId = json.laneId;
		for (let c of json.conditions) {
			this.conditions.push(new Condition(c));
		}
	}
	
	toJson() {
		var cond = [];
		for (let c of this.conditions) {
			cond.push(c.toJson());
		}
		return {
			laneId: this.laneId,
			conditions: cond
		};
	}
	
	matches(issue: any) {
		for (let c of this.conditions) {
			if (!c.matches(issue)) {
				return false;
			}
		}
		return true;
	}
}

export const CON_TP_LABEL:number = 1;
export const CON_TP_NOT_LABEL:number = 2;
export const CON_TP_ISSUE_STATE:number = 3;
export const CON_TP_NOT_ISSUE_STATE:number = 4;
export const CONDITION_TYPES = [
	0,
	CON_TP_LABEL,
	CON_TP_NOT_LABEL,
	CON_TP_ISSUE_STATE,
	CON_TP_NOT_ISSUE_STATE,
];
export const CONDITION_TYPE_LABEL: any = {
	0 : "None",
	[CON_TP_LABEL]: "has label",
	[CON_TP_NOT_LABEL]: "doesn't have label",
	[CON_TP_ISSUE_STATE]: "issue is in state",
	[CON_TP_NOT_ISSUE_STATE]: "issue is not in state"
};


export class Condition {
	conditionType: number = 0;
	value: string  = "";
	
	constructor(json: any) {
		this.conditionType = json["conditionType"];
		this.value = json["value"];	
	}
	
	toJson() {
		return {
			"conditionType": this.conditionType,
			"value" : this.value
		};
	}
	
	hasLabel(issue:any, label:string) : Boolean {
		var ucLabel = label.toUpperCase();
		for (let l of issue["fields"]["labels"]) {
			if (l.toUpperCase() == ucLabel) {
				return true;
			}
		}
		return false;
	}
	
	matches(issue: any): Boolean {
		if (this.conditionType == CON_TP_LABEL) {
			return this.hasLabel(issue, this.value);
		} else if (this.conditionType == CON_TP_NOT_LABEL) {
			return !issue["fields"]["labels"].includes	(this.value);
		} else if (this.conditionType == CON_TP_ISSUE_STATE) {
			return issue.fields.status.id == this.value;
		} else if (this.conditionType == CON_TP_NOT_ISSUE_STATE) {
			return issue["status"]["name"] != this.value;		
		} else {
			console.error(this.conditionType);
			console.error(typeof(this.conditionType));
			throw new Error("Unexpected condition type " + this.conditionType);
		}
	}
}
