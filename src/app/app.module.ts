import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UploadCDRComponent } from './_components/upload-cdr/upload-cdr.component';
import { MainMenuComponent } from './_components/main-menu/main-menu.component';
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from "@angular/common/http";
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





const appRoutes: Routes = [
  {path: '', component: MainMenuComponent},
  {path: 'upload', component: UploadCDRComponent},
  {path: 'cdr', component: ShowCDRComponent},
  {path: 'report/menu', component: ReportMenuComponent},
  {path: 'report', component: AllOperatorReportComponent},
  {path: 'history', component: CallHistorySetupComponent},
  {path: 'history/:number', component: ShowNumbeCallHistoryComponent},
  {path: 'operator', component: OperatorListComponent},
  {path: 'operator/add', component: OperatorAddComponent},
  {path: 'operator/:id', component: OperatorShowComponent},
  {path: 'about', component: AboutComponent},
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
    ReportMenuComponent
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
  ],
  providers: [ShowCDRComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
