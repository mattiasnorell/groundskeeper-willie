import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ZoneDaySelectorComponent } from './components/zone-day-selector/zone-day-selector.component';

@NgModule({
	imports: [ BrowserModule],
	declarations: [AppComponent, ZoneDaySelectorComponent],
	bootstrap: [AppComponent]
})

export class AppModule {}