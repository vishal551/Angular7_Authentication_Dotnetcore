import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Register } from "../CustomClass/Register";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Register>;
  public currentUser: Observable<Register>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Register>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Register {
    return this.currentUserSubject.value;
  }

  login(register: Register) {
    const headers = new HttpHeaders().set("content-type", "application/json");
    return this.http
      .post<any>(`http://localhost:51668/Users/authenticate`, Register, {
        headers
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
