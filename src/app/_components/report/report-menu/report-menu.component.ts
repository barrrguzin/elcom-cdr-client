import { Component } from '@angular/core';
import {ReportService} from "../../../_services/report.service";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";
import {OperatorService} from "../../../_services/operator.service";
import {Operator} from "../../../_models/operator";

@Component({
  selector: 'app-report-menu',
  templateUrl: './report-menu.component.html',
  styleUrls: ['./report-menu.component.css']
})
export class ReportMenuComponent {

  selected: Date | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  operators: Operator[] = [];
  selectedOperators: any = [];
  recipientsList: string[] = [];
  email: string = '';

  constructor(private reportService: ReportService, private operatorService: OperatorService, private router: Router) {
    this.operatorService.getOperatorList().subscribe(response => {
      this.operators = response;
    }, error => {
      console.log("Unable to get operator list, server return: " + error.statusCode);
    })
  }

  setStartDate(): void {
    if (this.selected) {
      this.startDate = formatDate(this.selected, 'yyyy-MM-dd', 'en-US');
    }
  }

  setEndDate(): void {
    if (this.selected) {
      this.endDate = formatDate(this.selected, 'yyyy-MM-dd', 'en-US');
    }
  }

  addOperatorToList(id: number | null): void {
    if (id) {
      if (!this.selectedOperators.includes(id)) {
        this.selectedOperators.push(id);
      } else {
        const index: number = this.selectedOperators.indexOf(id);
        if (index !== -1) {
          this.selectedOperators.splice(index, 1);
        }
      }
    }
  }

  getAllOperatorReport():void {
    if (this.startDate && this.endDate) {
      this.router.navigate(['report', {startDate: this.startDate, endDate: this.endDate}])
    }
  }

  getOperatorReportByList(): void {
    if (this.startDate && this.endDate && this.selectedOperators.length > 0) {
      this.router.navigate(['report', {operatorIds: this.selectedOperators, startDate: this.startDate, endDate: this.endDate}])
    }
  }

  getOperatorReportOnEmail(): void {
    if (this.startDate && this.endDate && this.selectedOperators.length > 0 && this.recipientsList.length > 0) {
      this.reportService.getOperatorReportOnEmail(this.recipientsList, this.selectedOperators, this.startDate, this.endDate).subscribe()
      this.clearRecipientsList();
    }
  }

  addEmailToList(): void {
    this.recipientsList.push(this.email);
    this.email = '';
  }

  clearRecipientsList(): void {
    this.recipientsList = [];
  }

  clearSelectedOperators(): void {
    this.selectedOperators = [];
  }

  deleteFromRecipientsList(email: string): void {
    const index = this.recipientsList.indexOf(email, 0);
    if (index > -1) {
      this.recipientsList.splice(index, 1);
    }
  }
}
