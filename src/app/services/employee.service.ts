import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../CustomClass/Employee";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  rootURL = environment.APIURL;
  constructor(private http: HttpClient) {}

  AddEmployee(emp: Employee) {
    const URL = this.rootURL + "/employee/addemployee";
    const headers = new HttpHeaders().set("content-type", "application/json");
    return this.http.post(URL, emp, { headers });
  }
  getAllEmployee() {
    const URL = this.rootURL + "/employee";
    const headers = new HttpHeaders().set("content-type", "application/json");
    return this.http.get(URL);
  }
  deleteEmployee(Id: number) {
    const URL = this.rootURL + "/employee/deleteEmployee/" + Id;
    const headers = new HttpHeaders().set("content-type", "application/json");
    return this.http.delete(URL, { headers });
  }
  updateEmployee(emp: Employee) {
    debugger;
    const URL = this.rootURL + "/employee/updateEmployee/" + emp.Id;
    const headers = new HttpHeaders().set("content-type", "application/json");
    return this.http.put(URL, emp, { headers });
  }
}
