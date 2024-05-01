// header.component.ts
import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  protected isAdmin: boolean = false;
  protected isLoggedIn: boolean = false;

  constructor(private router: Router,private authService: AuthService) {
  }

  ngOnInit() {
    // this.isAdmin = this.authService.isAdmin();

    this.authService.getLoggedInStatus().subscribe((loggedIn) => {
      console.log(loggedIn)
      console.log(this.authService.isAdmin())
      this.isLoggedIn = this.authService.isLoggedIn();
      this.isAdmin = this.authService.isAdmin();
    });
  }

  openAdminPanel() {
    this.router.navigate(['/admin']);
  }

  openAccountEdit() {
    this.router.navigate(['/account']);
  }
}
