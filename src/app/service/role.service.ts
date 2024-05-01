import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../models/movie.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleUrl = `${environment.baseUrl}/role`

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.roleUrl}`);
  }
}
