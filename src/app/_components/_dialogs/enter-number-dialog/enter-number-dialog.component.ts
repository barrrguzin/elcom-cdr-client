import {Component, Inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-enter-number-dialog',
  templateUrl: './enter-number-dialog.component.html',
  styleUrls: ['./enter-number-dialog.component.css'],
})
export class EnterNumberDialogComponent {
  number: string

  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: any) {
    this.number = '';
  }
}

