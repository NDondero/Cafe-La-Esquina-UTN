import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export default class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly passwordInputType = signal<'password' | 'text'>('password');

  togglePasswordInputType() {
    this.passwordInputType.update((v) => {
      return v === 'password' ? 'text' : 'password';
    });
  }

  protected readonly loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    const credentials = this.loginForm.getRawValue();
    await this.auth.login(credentials);
    this.router.navigateByUrl('/productos');
  }
}
