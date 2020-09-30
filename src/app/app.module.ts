import { MatNativeDateModule } from '@angular/material/core';
import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListActivitiesComponent } from './components/list-activities/list-activities.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddEditActivitiesComponent } from './components/add-edit-activities/add-edit-activities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonNavbarComponent } from './components/common-navbar/common-navbar.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SyncComponent } from './components/sync/sync.component';
import { BackMenuComponent } from './components/back-menu/back-menu.component';
import { ImgFormComponent } from './components/img-form/img-form.component';
import { SelectCompanyComponent } from './components/select-company/select-company.component';
import { WelcomeMessageComponent } from './components/welcome-message/welcome-message.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import * as Hammer from 'hammerjs';
import { HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListActivitiesComponent,
    HomeComponent,
    SpinnerComponent,
    AddEditActivitiesComponent,
    TutorialComponent,
    NavbarComponent,
    CommonNavbarComponent,
    SyncComponent,
    BackMenuComponent,
    ImgFormComponent,
    SelectCompanyComponent,
    WelcomeMessageComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    HammerModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
