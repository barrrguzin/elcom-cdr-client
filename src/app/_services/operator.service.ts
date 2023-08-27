import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Operator} from "../_models/operator";

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http: HttpClient) { }

  getOperatorList() {
    return this.http.get<Operator[]>('http://localhost:8080/api/operator', {withCredentials: true})
  }

  getOperator(id: number) {
    return this.http.get<Operator>('http://localhost:8080/api/operator/' + id, {withCredentials: true})
  }

  addOperator(operator: Operator) {
    return this.http.post<any>('http://localhost:8080/api/operator/', operator, {withCredentials: true})
  }

  deleteOperator(id: number) {
    return this.http.delete('http://localhost:8080/api/operator/' + id, {withCredentials: true})
  }

  updateOperator(operator: Operator) {
    return this.http.patch<any>('http://localhost:8080/api/operator/', operator, {withCredentials: true})
  }
}
