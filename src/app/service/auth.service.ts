import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {
  }


  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  public setLoggedInStatus(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  public getLoggedInStatus(): BehaviorSubject<boolean> {
    return this.isLoggedInSubject;
  }

  public setRole(role: string) {
    sessionStorage.setItem('role', JSON.stringify(role));
  }

  public setUserId(id: number) {
    sessionStorage.setItem('userId', JSON.stringify(id));
  }

  public getRole(): string {
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem('role'));
  }

  public getUserId(): number {
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem('userId'));
  }

  public setToken(jwtToken: string) {
    sessionStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    // @ts-ignore
    return sessionStorage.getItem('jwtToken');
  }

  public clear() {
    sessionStorage.clear();
    this.setLoggedInStatus(false)
  }

  public isLoggedIn(): boolean {
    var loggedIn = this.getRole() !== null && this.getToken() !== null
    // this.setLoggedInStatus(loggedIn)
    return loggedIn;
  }

  public isAdmin() {
    const role: string = this.getRole();
    return role !== null && role.toLowerCase() === 'admin';
  }

  public isUser() {
    const role: string = this.getRole();
    return role !== null && role.toLowerCase() === 'user';
  }

  public forbidIfNotAdmin() {
    if (!this.isAdmin()) {
      this.router.navigate(['/forbidden']);
    }
  }

  public forbidIfNotLoggedIn() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/forbidden']);
    }
  }
}
