import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./component/register/register.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./component/login/login.component";
import { LayoutComponent } from "../layout/layout.component";
import { HomeComponent } from "./component/home/home.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { JwtInterceptor } from "src/Helpers/jwt.interceptor";
import { ErrorInterceptor } from "src/Helpers/error.interceptor";
import { fakeBackendProvider } from "src/Helpers/fake-backend";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
