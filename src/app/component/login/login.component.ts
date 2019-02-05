import { Component, OnInit } from "@angular/core";
import { Register } from "src/app/CustomClass/Register";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { first } from "rxjs/operators";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  login = new Register();
  myLoginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.myLoginForm = new FormGroup({
      Username: new FormControl("", Validators.required),
      Password: new FormControl("", Validators.required)
    });
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // LoginUser(login: Register) {
  //   this.submitted = true;
  //   if (this.myLoginForm.invalid) {
  //     return;
  //   }
  //   this.loginService.LoginUser(login).subscribe(response => {
  //     debugger;
  //     if (response) {
  //       // localStorage.setItem("access_token", JSON.stringify(response.Token));
  //       //var d = JSON.parse(localStorage.getItem('access_token'));
  //       this.router.navigate(["/home"]);
  //       // debugger;
  //       // this.L_Component.LoadEvent();
  //       //location.reload();
  //     }
  //   });
  // }
  LoginUser(reg: Register) {
    debugger;
    this.authenticationService
      .login(reg)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.error = error;
          // this.loading = false;
        }
      );
  }
}
