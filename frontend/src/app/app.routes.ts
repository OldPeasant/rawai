import { Routes } from '@angular/router';
import { StartupComponent } from './startup/startup.component'
import { QueryCurrentSprintComponent } from './query-current-sprint/query-current-sprint.component'
import { ClassificationSettingsComponent } from './settings/classification-settings/classification-settings.component'
import { ServerSettingsComponent } from './settings/server-settings/server-settings.component'
import { TokenSettingsComponent } from './settings/token-settings/token-settings.component'

export const routes: Routes = [
	{ path:'', component: StartupComponent },
	{ path:'startup', component: StartupComponent }, 
	{ path:'query-current-sprint', component: QueryCurrentSprintComponent },
	{ path:'settings/classification', component: ClassificationSettingsComponent },
	{ path:'settings/server', component: ServerSettingsComponent },
	{ path:'settings/token', component: TokenSettingsComponent }
];
