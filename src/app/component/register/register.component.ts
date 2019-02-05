import { Component, OnInit } from "@angular/core";
import { CityService } from "src/app/services/city.service";
import { Register } from "src/app/CustomClass/Register";
import { MustMatch } from "../../../Helpers/must-match";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { RegisterService } from "src/app/services/register.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  listCity: any;
  register = new Register();
  submitted = false;
  myRegisterForm: FormGroup;
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    // this.GetCityList();
    this.myRegisterForm = this.formbuilder.group(
      {
        FirstName: new FormControl("", Validators.required),
        LastName: new FormControl("", Validators.required),
        Username: new FormControl("", [Validators.required, Validators.email]),
        Password: new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ]),
        ConfirmPassword: new FormControl("", Validators.required)
      },
      {
        validator: MustMatch("Password", "ConfirmPassword")
      }
    );
  }
  RegisterUser(register: Register) {
    this.submitted = true;
    if (this.myRegisterForm.invalid) {
      return;
    }
    this.registerService.RegisterUser(register).subscribe(response => {
      if (response == null) {
        this.router.navigate([""]);
      }
    });
  }
  // GetCityList() {
  //   debugger;
  //   this.cityService.GetCityList().subscribe(
  //     result => {
  //       this.listCity = result;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.Password.value;
    let confirmPass = group.controls.ConfirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
