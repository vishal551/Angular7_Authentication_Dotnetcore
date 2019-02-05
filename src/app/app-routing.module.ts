import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent } from "./component/login/login.component";
import { LayoutComponent } from "src/layout/layout.component";
import { HomeComponent } from "./component/home/home.component";
import { AuthGuard } from "src/app/guard/auth.guard";
const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "", component: LoginComponent },
  // { path: "home", component: HomeComponent }
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "home", component: HomeComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
