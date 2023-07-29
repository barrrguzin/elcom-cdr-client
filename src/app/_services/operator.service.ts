import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Operator} from "../_models/operator";

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http: HttpClient) { }

  getOperatorList() {
    return this.http.get<Operator[]>('http://localhost:8080/api/operator')
  }

  getOperator(id: number) {
    return this.http.get<Operator>('http://localhost:8080/api/operator/' + id)
  }

  addOperator(operator: Operator) {
    return this.http.post<any>('http://localhost:8080/api/operator/', operator, {})
  }

  deleteOperator(id: number) {
    return this.http.delete('http://localhost:8080/api/operator/' + id, {})
  }

  updateOperator(operator: Operator) {
    return this.http.patch<any>('http://localhost:8080/api/operator/', operator, {})
  }
}
