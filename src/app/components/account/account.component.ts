import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {User} from "../../models/user.model";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {RoleService} from "../../service/role.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  protected user!: User;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['/login']);
  }
}
