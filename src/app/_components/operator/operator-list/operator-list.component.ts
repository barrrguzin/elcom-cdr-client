import { Component } from '@angular/core';
import {Operator} from "../../../_models/operator";
import {OperatorService} from "../../../_services/operator.service";

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.css']
})
export class OperatorListComponent {

  operators: Operator[] = [];

  constructor(private operatorService: OperatorService) {
    this.operatorService.getOperatorList().subscribe(response => {
      this.operators = response;
    })
  }

}
