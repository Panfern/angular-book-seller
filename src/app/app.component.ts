import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/Role.enum';
import { User } from './models/User.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular-book-seller';

  currentUser: User = new User();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }

  isAdmin() {
    return this.currentUser?.role === Role.ADMIN;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
