import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/models/user.model';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),

  });

  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(
   private router: Router,
   private authService: AuthService,
   private cdRef: ChangeDetectorRef
   ) {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges(); // kényszerített újrarenderelés
  }

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Kérjük, javítsa ki az űrlap hibáit a beküldés előtt.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const userData: Partial<User> = {

      name: this.signUpForm.value.name || '',
      email: this.signUpForm.value.email || '',
      booked: [],
    };

    const email = this.signUpForm.value.email || '';
    const pw = this.signUpForm.value.password || '';

     this.authService.signUp(email, pw, userData)
          .then(userCredential => {
            console.log('Registration succesful:', userCredential.user);
            this.authService.updateLoginStatus(true);
            this.router.navigateByUrl('/home');
          })
          .catch(error => {
            console.error('Regisztrációs hiba:', error);
            this.isLoading = false;
            this.showForm = true;

            switch(error.code) {
              case 'auth/email-already-in-use':
                this.signupError = 'This email already in use.';
                break;
              case 'auth/invalid-email':
                this.signupError = 'Invalid email.';
                break;
              case 'auth/weak-password':
                this.signupError = 'The password is too weak. Use at least 6 characters.';
                break;
              default:
                this.signupError = 'An error has occurred during registration. Please try again later.';
            }
          });
  }
}
