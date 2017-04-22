import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ZoneDaySelectorComponent } from './components/zone-day-selector/zone-day-selector.component';
import { LogComponent } from './components/log/log.component';
import { CurrentStatusComponent } from './components/current-status/current-status.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MapComponent } from './components/map/map.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
	imports: [ 
		BrowserModule, 
		HttpModule,
		AppRoutingModule
	],
	declarations: [
		AppComponent, 
		ZoneDaySelectorComponent, 
		LogComponent, 
		MapComponent,
		CurrentStatusComponent, 
		SettingsComponent
	],
	bootstrap: [
		AppComponent
	]
})

export class AppModule {}