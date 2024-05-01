import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  userName: string = '';
  userPassword: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response)
        this.authService.setRole(response.user.role);
        this.authService.setUserId(response.user.id);
        this.authService.setToken(response.jwtToken);
        this.authService.setLoggedInStatus(response.user.role !== null && response.jwtToken !== null)

        if (this.authService.isAdmin()) {
          console.log("ADMIN")
          this.router.navigate(['/admin']);
        } else {
          console.log("USER")
          this.router.navigate(['/home']);
        }
      },
      (error: any) => {
        this.errorMessage = 'Wrong username or password';
      }
    );
  }

  registerUser() {
    this.router.navigate(['/register']);
  }
}
