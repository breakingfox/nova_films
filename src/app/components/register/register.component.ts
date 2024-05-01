import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  userName: string = '';
  name: string = '';
  userPassword: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  register(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe(
      (response: any) => {
          this.router.navigate(['/login']);
      },
      (error: any) => {
        if (error.status === 409) {
          this.errorMessage = 'Username already exists. Please choose a different username.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }
}
