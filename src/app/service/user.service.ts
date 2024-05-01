import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {LoginInfo} from "../models/login-info.model";
import {AuthService} from "./auth.service";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {UserRequest} from "../models/user-request.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = environment.baseUrl;

  requestHeader = new HttpHeaders({'No-Auth': 'True'});

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  public register(registerData: any) {
    return this.http.post(this.PATH_OF_API + '/register', registerData);
  }

  public login(loginData: LoginInfo) {
    return this.http.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  //todo update user not working
  public updateUser(id: number, request: UserRequest): Observable<User> {
    return this.http.post<User>(`${this.PATH_OF_API}/user/${id}`, request)
  }

  public forUser() {
    return this.http.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${(this.PATH_OF_API)}/user/${id}`);
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${(this.PATH_OF_API)}/user/current`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${(this.PATH_OF_API)}/user`);
  }


  public forAdmin() {
    return this.http.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  // @ts-ignore
  public roleMatch(allowedRole: string): boolean {
    let isMatch = false;
    const userRole: any = this.authService.getRole();

    if (userRole != null && userRole) {
      if (userRole.roleName.toLowerCase() === allowedRole.toLowerCase()) {
        isMatch = true;
        return isMatch;
      } else {
        return isMatch;
      }
    }
  }
  deleteUser(id: number): void {
    this.http.post(`${(this.PATH_OF_API)}/user/delete/${id}`,[]).subscribe(data=>data);
  }
}
