import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class CityService {
  rootURL = environment.APIURL;
  constructor(private http: HttpClient) {}

  GetCityList() {
    try {
      const url = this.rootURL + "/City";
      return this.http.get(url);
    } catch (error) {
      console.log(error);
    }
  }
}
