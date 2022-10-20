import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  faUser = faUserCircle;
  errormessage: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
        if (err?.status === 409) {
          this.errormessage = 'Username already exists';
        } else {
          this.errormessage = 'Unexpected error. Error is ' + err?.errormessage;
          console.log(err);
        }
      }
    );
  }
}
