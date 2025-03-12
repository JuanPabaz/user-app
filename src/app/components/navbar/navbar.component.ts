import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() users:User[] = [];
  @Input() paginator = {};

  constructor(
    private auth_service: AuthService,
    private router: Router)
    {}

  get user(){
    return this.auth_service.user;
  }

  logoutHandler(){
    this.auth_service.logOut();
    this.router.navigate(['/login'])
  }
}
