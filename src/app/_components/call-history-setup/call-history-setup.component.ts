import { Component } from '@angular/core';
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";
import {CDRService} from "../../_services/cdr.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-call-history-setup',
  templateUrl: './call-history-setup.component.html',
  styleUrls: ['./call-history-setup.component.css']
})
export class CallHistorySetupComponent {

  number: string;
  date: Date | undefined;

  constructor(private router: Router, private cdrService: CDRService) {
    this.number = '';
  }

  getHistory() {
    if (this.date) {
      this.router.navigate(['history', this.number, {startDate: formatDate(this.date, 'yyyy-MM-dd', 'en-US')}])
    } else {
      this.router.navigate(['history', this.number])
    }
  }

  downloadHistory() {
    if (this.date) {
      this.cdrService.downloadHistory(this.number, formatDate(this.date, 'yyyy-MM-dd', 'en-US')).subscribe(file => {
        const data: Blob = new Blob([file], {
          type: "text/csv;charset=utf-8"
        });
        saveAs(data);
      })
    } else {
      this.cdrService.downloadHistory(this.number, undefined).subscribe(file => {
        const data: Blob = new Blob([file], {
          type: "text/csv;charset=utf-8"
        });
        saveAs(data, this.number+'.csv');
      })
    }

  }

}
