import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CallData} from "../../_models/call-data";
import {CDRService} from "../../_services/cdr.service";
import {MatOptionSelectionChange} from "@angular/material/core";
import {Dialog} from "@angular/cdk/dialog";
import {EnterNumberDialogComponent} from "../_dialogs/enter-number-dialog/enter-number-dialog.component";

@Component({
  selector: 'app-show-numbe-call-history',
  templateUrl: './show-numbe-call-history.component.html',
  styleUrls: ['./show-numbe-call-history.component.css']
})
export class ShowNumbeCallHistoryComponent implements OnInit{

  pathVariables: Params;
  rows: CallData[];
  quantity: string;
  offset: number;
  number: string;
  page: string;
  startDate: string | undefined;

  constructor(private cdrService: CDRService,private router: Router, private activatedRoute: ActivatedRoute, public dialog: Dialog) {
    this.pathVariables = activatedRoute.snapshot.params;

    if (this.pathVariables['number']) {
      this.number = this.pathVariables['number'];
    } else {
      this.number = '';
      this.enterNumber();
    }

    if (this.pathVariables['onPage'] && (this.pathVariables['onPage'] == 10 || this.pathVariables['onPage'] == 25 || this.pathVariables['onPage'] == 50)) {
      this.quantity = this.pathVariables['onPage'];
    } else {
      this.quantity = '25';
    }

    if (this.pathVariables['offset']) {
      this.offset = this.pathVariables['offset']
    } else {
      this.offset = 0;
    }

    if (this.pathVariables['page']) {
      this.page = this.pathVariables['page'];
      this.setOffset();
    } else {
      this.page = '1';
    }

    if (this.pathVariables['startDate']) {
      this.startDate = this.pathVariables['startDate'];
    }

    console.log(this.startDate);
    this.rows = []
  }

  nextPage():void {
    const newPage = Number(this.page)+1
    this.page = String(newPage);
    this.setOffset();

    if (this.startDate != '') {
      this.router.navigate(['history', this.number, {onPage: this.quantity, page: newPage, startDate: this.startDate}]);
    } else {
      this.router.navigate(['history', this.number, {onPage: this.quantity, page: newPage}]);
    }

    this.getCDR();
  }

  previousPage():void {
    if (this.page != '1') {
      const newPage = Number(this.page)-1
      this.page = String(newPage);
      this.setOffset();

      if (this.startDate != '') {
        this.router.navigate(['history', this.number, {onPage: this.quantity, page: newPage, startDate: this.startDate}]);
      } else {
        this.router.navigate(['history', this.number, {onPage: this.quantity, page: newPage}]);
      }

      this.getCDR();
    }
  }

  toDate(date: any): String {
    return date.hour+':'+date.minute+':'+date.second+' '+date.dayOfMonth+'-'+date.monthValue+'-'+date.year;
  }

  setOffset(): void {
    this.offset = (Number(this.page)-1)*Number(this.quantity);
  }

  setQuantity(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      console.log(event.source.value)
      this.quantity = event.source.value;
      this.page = '1';
      this.setOffset();

      if (this.startDate != '') {
        this.router.navigate(['history', this.number, {onPage: event.source.value, startDate: this.startDate}]);
      } else {
        this.router.navigate(['history', this.number, {onPage: event.source.value}]);
      }

      this.getCDR();
    }
  }

  getCDR(): void {
    if (this.number || this.number != '') {
      this.cdrService.getCallHistory(this.number, Number(this.quantity), this.offset, this.startDate).subscribe(
        cdr => {
          this.rows = cdr
        }
      )
    }
  }

  enterNumber(): void {
    const dialogRef = this.dialog.open<string>(EnterNumberDialogComponent, {
      width: '250px',
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.number = result;
        this.page = '1';
        this.setOffset();
        this.router.navigate(['history', this.number, {onPage: this.page}]);
        this.getCDR();
      }
    });
  }

  ngOnInit(): void {
    this.getCDR();
  }

}

