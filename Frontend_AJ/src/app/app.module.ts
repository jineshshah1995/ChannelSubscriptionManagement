import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Importing internal modules and components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Forms/Authentication/register/register.component';
import { LoginComponent } from './Forms/Authentication/login/login.component';
import { HomeComponent } from './Forms/home/home.component';
import { ChannelsListComponent } from './Forms/ChannelsList/channels-list/channels-list.component';
import { UseroperationsComponent } from './Forms/ChannelsList/useroperations/useroperations.component';

// Import Service 
import { BackendService } from '../app/Services/backend.service';
import {AuthGuardService  } from './Services/Auth/authgaurd.service';

// Importing reqest interceptor..
import { ErrorIntercept } from './Interceptor/error.interceptor';

// Importing kendo ui grid libs
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BillingDetailsComponent } from './Forms/ChannelsList/billing-details/billing-details.component';
import { ErrorComponent } from './Forms/Error/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ChannelsListComponent,
    UseroperationsComponent,
    BillingDetailsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule,
    DialogModule,
    DateInputsModule,
    IntlModule
  ],
  providers: [BackendService, AuthGuardService,
  { 
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
  }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
