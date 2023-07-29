import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {finalize, Subscription} from "rxjs";

@Component({
  selector: 'app-upload-cdr',
  templateUrl: './upload-cdr.component.html',
  styleUrls: ['./upload-cdr.component.css']
})
export class UploadCDRComponent {

  @Input()
  requiredFileType:string;

  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(private http: HttpClient) {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
    this.requiredFileType = ".txt"
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("cdr", file);
      const upload$ = this.http.post("http://localhost:8080/api/upload", formData, {
        reportProgress: true,
        observe: "events"
      }).pipe(
        finalize(() => this.reset())
      );

      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress && event?.loaded && event?.total) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      })
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
    // this.uploadProgress = null;
    // this.uploadSub = null;
  }
}
