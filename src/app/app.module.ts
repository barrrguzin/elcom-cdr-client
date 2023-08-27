import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UploadCDRComponent } from './_components/upload-cdr/upload-cdr.component';
import { MainMenuComponent } from './_components/main-menu/main-menu.component';
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ShowCDRComponent } from './_components/show-cdr/show-cdr.component';
import { ShowNumbeCallHistoryComponent } from './_components/show-numbe-call-history/show-numbe-call-history.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {DialogModule} from '@angular/cdk/dialog';
import { EnterNumberDialogComponent } from './_components/_dialogs/enter-number-dialog/enter-number-dialog.component';
import { OperatorListComponent } from './_components/operator/operator-list/operator-list.component';
import { OperatorShowComponent } from './_components/operator/operator-show/operator-show.component';
import { OperatorAddComponent } from './_components/operator/operator-add/operator-add.component';
import { CallHistorySetupComponent } from './_components/call-history-setup/call-history-setup.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import { AboutComponent } from './_components/about/about.component';
import { AllOperatorReportComponent } from './_components/report/all-operator-report/all-operator-report.component';
import { ReportMenuComponent } from './_components/report/report-menu/report-menu.component';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {authGuard} from "./_services/auth.guard";
import { LoginComponent } from './_components/login/login.component';
import {AuthInterceptor} from "./_helpers/auth.interceptor";
import { AuthorityErrorDialogComponent } from './_components/_dialogs/authority-error-dialog/authority-error-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";





const appRoutes: Routes = [
  {path: '', component: MainMenuComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'upload', component: UploadCDRComponent, canActivate: [authGuard]},
  {path: 'cdr', component: ShowCDRComponent, canActivate: [authGuard]},
  {path: 'report/menu', component: ReportMenuComponent, canActivate: [authGuard]},
  {path: 'report', component: AllOperatorReportComponent, canActivate: [authGuard]},
  {path: 'history', component: CallHistorySetupComponent, canActivate: [authGuard]},
  {path: 'history/:number', component: ShowNumbeCallHistoryComponent, canActivate: [authGuard]},
  {path: 'operator', component: OperatorListComponent, canActivate: [authGuard]},
  {path: 'operator/add', component: OperatorAddComponent, canActivate: [authGuard]},
  {path: 'operator/:id', component: OperatorShowComponent, canActivate: [authGuard]},
  {path: 'about', component: AboutComponent, canActivate: [authGuard]},
]



@NgModule({
  declarations: [
    AppComponent,
    UploadCDRComponent,
    MainMenuComponent,
    ShowCDRComponent,
    ShowNumbeCallHistoryComponent,
    EnterNumberDialogComponent,
    OperatorListComponent,
    OperatorShowComponent,
    OperatorAddComponent,
    CallHistorySetupComponent,
    AboutComponent,
    AllOperatorReportComponent,
    ReportMenuComponent,
    LoginComponent,
    AuthorityErrorDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    DialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [ShowCDRComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
