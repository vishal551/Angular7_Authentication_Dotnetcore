import { Injectable } from "@angular/core";
import { Register } from "../CustomClass/Register";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}

  LoginUser(login: Register) {
    const headers = new HttpHeaders().set("content-type", "application/json");
    return this.http.post("http://localhost:51668/Users/authenticate", login, {
      headers
    });
  }
}
