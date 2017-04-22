import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogComponent } from './components/log/log.component';
import { CurrentStatusComponent } from './components/current-status/current-status.component';
import { MapComponent } from './components/map/map.component';
import { SettingsComponent } from './components/settings/settings.component';


const appRoutes: Routes = [
	{ path: 'status', component: CurrentStatusComponent },
    { path: 'map', component: MapComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: 'log', component: LogComponent },
    { path: '', redirectTo:'/status', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}