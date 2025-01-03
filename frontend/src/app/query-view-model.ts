import { ClassificationModel } from './classification-model';

export class SprintViewModel {

	title: string = "";
	lanes: any[] = [];
	unclassifiedJiras :any[] = [];
	
	constructor(
		private classificationModel: ClassificationModel,
		private sprint: any,
		private allJiras: any) {
		
		this.title = sprint.name;
		var jirasByLaneId = this.groupJirasByLaneId(classificationModel, allJiras);
		for (let lane of classificationModel.lanes) {
			var jirasInLane = jirasByLaneId[lane.id];
			if (lane.showIfEmpty || jirasInLane.length > 0) {
				var viewLane = {
					'label' : lane.label,
					'highlightIfNotAssigned' : lane.highlightIfNotAssigned,
					'highlightIfNotAssignedStyle' : lane.highlightIfNotAssignedStyle,
					'highlightAll' : lane.highlightAll,
					'highlightAllStyle' : lane.highlightAllStyle,
					'jiras' : jirasInLane
				};
				this.lanes.push(viewLane);
			}
		}
	}
		 
	
	groupJirasByLaneId(classificationModel: ClassificationModel, allJiras: any): any {
		var jirasByLaneId: any = {};
		for (let l of classificationModel.lanes) {
			jirasByLaneId[l.id] = [];
		}
		for (let j of allJiras) {
			var lane = classificationModel.getLane(j);
			if (lane == null) {
				this.unclassifiedJiras.push(j);
			} else {
				jirasByLaneId[lane.id].push(j);
			}
		}
		return jirasByLaneId;
	}
}