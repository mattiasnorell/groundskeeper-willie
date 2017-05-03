import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { ZoneDaySelectorComponent } from './components/zone-day-selector/zone-day-selector.component';
import { LogComponent } from './components/log/log.component';
import { CurrentStatusComponent } from './components/current-status/current-status.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MapComponent } from './components/map/map.component';

import { AppRoutingModule } from './app-routing.module';

import { FirebaseConfig } from './firebase.config';

@NgModule({
	imports: [ 
		BrowserModule, 
		HttpModule,
		AngularFireModule.initializeApp(FirebaseConfig),
		AppRoutingModule
	],
	declarations: [
		AppComponent, 
		ZoneDaySelectorComponent, 
		LogComponent, 
		MapComponent,
		CurrentStatusComponent, 
		ScheduleComponent
	],
	bootstrap: [
		AppComponent
	]
})

export class AppModule {}