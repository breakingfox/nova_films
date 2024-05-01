import {Component, Input} from '@angular/core';
import {User} from "../../models/user.model";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {RoleService} from "../../service/role.service";
import {UserRequest} from "../../models/user-request.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  @Input() currentUser: boolean = false;

  protected user!: User;
  protected isAdmin: boolean = false;
  protected roles: string[] = [];

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.authService.forbidIfNotLoggedIn()
    if (this.currentUser) {
      this.userService.getCurrentUser()
        .subscribe(user => {
          this.user = user;
        })
    } else {
      this.route.params.subscribe(params => {
        this.userService.getUser(params['id']).subscribe(user => this.user = user);
      });
    }

    this.isAdmin = this.authService.isAdmin()

    this.roleService.getRoles()
      .subscribe(roles =>
        this.roles = roles)

  }

  saveUser() {
    let userInfo: UserRequest;
      userInfo = {
        name: this.user.name,
        role: this.user.role
    }

    if (this.user.id) {
      console.log(userInfo)
      this.userService.updateUser(this.user.id, userInfo).subscribe(user => user)
      this.router.navigate(['/home']);
    }
  }
}
