import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ZoneDaySelectorComponent } from './components/zone-day-selector/zone-day-selector.component';
import { LogComponent } from './components/log/log.component';
import { CurrentStatusComponent } from './components/current-status/current-status.component';
import { SettingsComponent } from './components/settings/settings.component';

const appRoutes: Routes = [
	{ path: '', component: CurrentStatusComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: 'log', component: LogComponent }  
];

@NgModule({
	imports: [ BrowserModule, RouterModule.forRoot(appRoutes)],
	declarations: [AppComponent, ZoneDaySelectorComponent, LogComponent, CurrentStatusComponent, SettingsComponent],
	bootstrap: [AppComponent]
})

export class AppModule {}