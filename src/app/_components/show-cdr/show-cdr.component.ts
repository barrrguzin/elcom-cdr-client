import {Component, OnInit} from '@angular/core';
import {CallData} from "../../_models/call-data";
import {CDRService} from "../../_services/cdr.service";

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-show-cdr',
  templateUrl: 'show-cdr.component.html',
  styleUrls: ['./show-cdr.component.css'],
})
export class ShowCDRComponent implements OnInit{

  pathVariables: Params;
  rows: CallData[];
  quantity: String;
  offset: number;
  filter: String;
  page: String;

  constructor(private cdrService: CDRService,private router: Router, private activatedRoute: ActivatedRoute) {
    this.pathVariables = activatedRoute.snapshot.params;

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
    if (this.pathVariables['filter']) {
      this.filter = this.pathVariables['filter']
    } else {
      this.filter = '';
    }
    if (this.pathVariables['page']) {
      this.page = this.pathVariables['page'];
      this.setOffset();
    } else {
      this.page = '1';
    }
    this.rows = []
  }

  nextPage():void {
    const newPage = Number(this.page)+1
    this.page = String(newPage);
    this.setOffset();
    this.router.navigate(['cdr', {onPage: this.quantity, page: newPage, filter: this.filter}]);
    this.getCDR();
  }

  previousPage():void {
    if (this.page != '1') {
      const newPage = Number(this.page)-1
      this.page = String(newPage);
      this.setOffset();
      this.router.navigate(['cdr', {onPage: this.quantity, page: newPage, filter: this.filter}]);
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
      this.router.navigate(['cdr', {onPage: event.source.value}]);
      this.getCDR();
    }
  }

  getCDR(): void {
    this.cdrService.getCDR(Number(this.quantity), this.offset, "").subscribe(
      cdr => {
        this.rows = cdr
      }
    )
  }

  ngOnInit(): void {
    this.getCDR();
    }

}
