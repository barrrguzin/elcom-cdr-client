import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CallData} from "../_models/call-data";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CDRService {

  //callDataList: CallData;

  constructor(private http: HttpClient) {}

  getCDR(quantity: number, offset: number, filter: string): Observable<CallData[]> {
    if (filter && filter != '') {
      return this.http.get<CallData[]>("http://localhost:8080/api/cdr", {params: {quantity: quantity, offset: offset, filter: filter}});
    } else {
      return this.http.get<CallData[]>("http://localhost:8080/api/cdr", {params: {quantity: quantity, offset: offset}});
    }

  }

  getCallHistory(number: String, quantity: number, offset: number, startDate: string | undefined): Observable<CallData[]> {
    if (startDate) {
      return this.http.get<CallData[]>("http://localhost:8080/api/history/"+number, {params: {quantity: quantity, offset: offset, startDate: startDate}});
    } else {
      return this.http.get<CallData[]>("http://localhost:8080/api/history/"+number, {params: {quantity: quantity, offset: offset}});
    }
  }

  downloadHistory(number: String, startDate: string | undefined): Observable<Blob> {
    if (startDate) {
      return this.http.get<Blob>("http://localhost:8080/api/history/download/"+number, {params: {startDate: startDate}, headers: new HttpHeaders({'Content-Type':'application/octet-stream', 'Accept':'application/octet-stream'}), responseType: 'blob' as 'json'}).pipe();
    } else {
      return this.http.get<Blob>("http://localhost:8080/api/history/download/"+number, {headers: new HttpHeaders({'Content-Type':'application/octet-stream', 'Accept':'application/octet-stream'}), responseType: 'blob' as 'json'}).pipe();
    }
  }

}
