import 'hammerjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { StatComponent } from './stat/stat.component';
import { BadgeComponent } from './badge/badge.component';
import { NoteComponent } from './note/note.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { DataService } from './services/data.service';
import { ChartsModule } from 'ng2-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import {MdSliderModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import { TagInputModule } from 'ng2-tag-input';
import { GaugeModule } from 'ng-gauge';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    StatComponent,
    BadgeComponent,
    NoteComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    MdSliderModule,
    MdInputModule,
    BrowserAnimationsModule,
    GaugeModule,
    SharedModule,
    ChartsModule
  ],
  providers: [
    DataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
