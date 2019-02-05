import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Register } from "../CustomClass/Register";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  rootURL = environment.APIURL;
  constructor(private http: HttpClient) {}

  RegisterUser(register: Register) {
    try {
      const URL = "http://localhost:51668/Users/Register";
      const headers = new HttpHeaders().set("content-type", "application/json");
      return this.http.post(URL, register, { headers });
    } catch (error) {
      console.log(error);
    }
  }
}
