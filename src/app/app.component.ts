import { Component } from "@angular/core";
import { Register } from "./CustomClass/Register";
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  currentUser: Register;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }
}
