import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAllOperatorReport(startDate: string, endDate: string) {
    return this.http.get<any>('http://localhost:8080/api/report/all', {params: {startDate: startDate, endDate: endDate}, withCredentials: true})
  }

  getOperatorReportByIdList(operatorIds: number[], startDate: string, endDate: string) {
    return this.http.get<any>('http://localhost:8080/api/report', {params: {operatorIds: operatorIds, startDate: startDate, endDate: endDate}, withCredentials: true})
  }

  getOperatorReport(id: number, startDate: string, endDate: string) {
    return this.http.get<any>('http://localhost:8080/api/report/' + id, {params: {startDate: startDate, endDate: endDate}, withCredentials: true})
  }

  getOperatorReportOnEmail(emails: string[], operatorIds: number[], startDate: string, endDate: string) {
    return this.http.get<any>("http://localhost:8080/api/report/mail", {params: {emails: emails, operatorIds: operatorIds, startDate: startDate, endDate: endDate}, withCredentials: true})
  }
}
