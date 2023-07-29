import { Component } from '@angular/core';
import {ReportService} from "../../../_services/report.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-all-operator-report',
  templateUrl: './all-operator-report.component.html',
  styleUrls: ['./all-operator-report.component.css']
})
export class AllOperatorReportComponent {

  pathVariables: Params;
  incomingCallsReport: any;
  incomingCallsReportKeys: string[] = [];
  outgoingCallsReport: any;
  outgoingCallsReportKeys: string[] = [];

  constructor(private reportService: ReportService, private activatedRoute: ActivatedRoute) {
    this.pathVariables = activatedRoute.snapshot.params;

    if (this.pathVariables['startDate'] && this.pathVariables['endDate']) {
      if (!this.pathVariables['operatorIds']) {
        this.reportService.getAllOperatorReport(this.pathVariables['startDate'], this.pathVariables['endDate']).subscribe(response => {
          this.incomingCallsReport = response['incoming'];
          for (let key in this.incomingCallsReport) {
            this.incomingCallsReportKeys.push(key)
          }

          this.outgoingCallsReport = response['outgoing'];
          for (let key in this.outgoingCallsReport) {
            this.outgoingCallsReportKeys.push(key)
          }
        }, error => {
          console.log('Server return response with error: ' + error.statusCode)
        })
      } else {
        this.reportService.getOperatorReportByIdList(this.pathVariables['operatorIds'], this.pathVariables['startDate'], this.pathVariables['endDate']).subscribe(response => {
          this.incomingCallsReport = response['incoming'];
          for (let key in this.incomingCallsReport) {
            this.incomingCallsReportKeys.push(key)
          }

          this.outgoingCallsReport = response['outgoing'];
          for (let key in this.outgoingCallsReport) {
            this.outgoingCallsReportKeys.push(key)
          }
        }, error => {
          console.log('Server return response with error: ' + error.statusCode)
        })
      }
    } else {
      console.log("There is no period to get report")
    }

  }
}
