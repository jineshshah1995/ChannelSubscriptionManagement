import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Forms/home/home.component'
import { LoginComponent } from './Forms/Authentication/login/login.component';
import { RegisterComponent } from './Forms/Authentication/register/register.component';

import { ChannelsListComponent } from './Forms/ChannelsList/channels-list/channels-list.component';

import { ErrorComponent } from './Forms/Error/error/error.component';

import {AuthGuardService as AuthGuard  } from './Services/Auth/authgaurd.service';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'channels', component: ChannelsListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
