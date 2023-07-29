import { Component } from '@angular/core';
import {Operator} from "../../../_models/operator";
import {OperatorService} from "../../../_services/operator.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-operator-add',
  templateUrl: './operator-add.component.html',
  styleUrls: ['./operator-add.component.css']
})
export class OperatorAddComponent {

  operator:Operator = {id: null, inputDestination: 0, lines: [], name: '', outputDestination: 0};

  inputDestination: string = '';
  outputDestination: string = '';

  moduleNumber: string = '';
  lineNumber: string = '';

  showInputDestinations = new FormControl;
  showOutputDestinations = new FormControl;
  showLines = new FormControl;
  errorMessage = new FormControl;

  constructor(private operatorService: OperatorService, private router: Router) {
  }

  addOperator() {
    if (this.operator.name != '') {
      this.operatorService.addOperator(this.operator).subscribe(ok => {
        this.router.navigateByUrl('operator');
      }, error => {
        this.errorMessage.setValue("Неудалось добавить оператора")
      })
    }
  }

  // addToInputDestination() {
  //   const destination = Number(this.inputDestination);
  //   if (destination) {
  //     if (!this.operator.inputDestinations.includes(destination)) {
  //       this.operator.inputDestinations.push(destination)
  //       this.showInputDestinations.setValue(this.operator.inputDestinations);
  //     }
  //   }
  //   this.inputDestination = '';
  // }
  //
  // addToOutputDestination() {
  //   const destination = Number(this.outputDestination);
  //   if (destination) {
  //     if (!this.operator.outputDestinations.includes(destination)) {
  //       this.operator.outputDestinations.push(destination)
  //       this.showOutputDestinations.setValue(this.operator.outputDestinations);
  //     }
  //   }
  //   this.outputDestination = '';
  // }

  private addLineAndModulePair(module: number, line: number) {
      const moduleTDM = {moduleNumber: module, lineNumber: line};
      if (!this.operator.lines.includes(moduleTDM)) {
        this.operator.lines.push(moduleTDM);
        this.showLines.setValue(this.operator.lines)
      }
  }

  addLineAndModulePairWithOptions() {
    const module = Number(this.moduleNumber);
    const line = Number(this.lineNumber);
    if (module || (module === 0 && this.moduleNumber === '0')) {
      if (this.lineNumber === '' && line === 0) {
        for (let i = 0; i<64; i++) {
          this.addLineAndModulePair(module, i);
        }
      }
      if (this.lineNumber == '-1-') {
        for (let i = 0; i<32; i++) {
          this.addLineAndModulePair(module, i);
        }
      }
      if (this.lineNumber == '-2-') {
        for (let i = 32; i<64; i++) {
          this.addLineAndModulePair(module, i);
        }
      }
      if (line || this.lineNumber === '0') {
        this.addLineAndModulePair(module, line);
      }
      this.moduleNumber = '';
      this.lineNumber = '';
    }
  }

  resetLines() {
    this.showLines.setValue([]);
    this.operator.lines = [];
  }

  // resetInputDestinations() {
  //   this.showInputDestinations.setValue([]);
  //   this.operator.inputDestinations = [];
  // }
  //
  // resetOutputDestinations() {
  //   this.showOutputDestinations.setValue([]);
  //   this.operator.outputDestinations = [];
  // }
}
