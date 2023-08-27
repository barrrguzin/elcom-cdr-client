import {Component, Inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-authority-error-dialog',
  templateUrl: './authority-error-dialog.component.html',
  styleUrls: ['./authority-error-dialog.component.css']
})
export class AuthorityErrorDialogComponent {
  error: string = 'Не удалось получить доступ к странице';

  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: string) {
  }
}
