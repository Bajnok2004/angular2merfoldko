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

  constructor(private cdRef: ChangeDetectorRef) {}

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

    const newUser: User = {

      name: this.signUpForm.value.name || '',
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      booked: [],

    };

    console.log('New user:', newUser);
    console.log('Form value:', this.signUpForm.value);

    setTimeout(() => {
      window.location.href = '/home';
    }, 2000);
  }
}
