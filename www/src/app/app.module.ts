import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { ZoneDaySelectorComponent } from './components/zone-day-selector/zone-day-selector.component';
import { LogComponent } from './components/log/log.component';
import { CurrentStatusComponent } from './components/current-status/current-status.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MapComponent } from './components/map/map.component';

import { AppRoutingModule } from './app-routing.module';

export const firebaseConfig = {
  	apiKey: "AIzaSyATn-bW-egDM0eBOR4Aaucyk56WapzrQKw",
    authDomain: "groundskeeper-willy.firebaseapp.com",
    databaseURL: "https://groundskeeper-willy.firebaseio.com",
    projectId: "groundskeeper-willy",
    storageBucket: "groundskeeper-willy.appspot.com",
    messagingSenderId: "176535335771"
};

@NgModule({
	imports: [ 
		BrowserModule, 
		HttpModule,
		AngularFireModule.initializeApp(firebaseConfig),
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