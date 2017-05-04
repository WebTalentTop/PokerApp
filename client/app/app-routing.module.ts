import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AboutComponent } from './about/about.component';
import { StatComponent } from './stat/stat.component';
import { BadgeComponent } from './badge/badge.component';
import { NoteComponent } from './note/note.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LivestComponent } from './livest/livest.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'stat', component: StatComponent },
  { path: 'badge', component: BadgeComponent },
  { path: 'note', component: NoteComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lst', component: LivestComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
