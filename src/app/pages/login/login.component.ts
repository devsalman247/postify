import { Component, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

export type IToast = {
  type: string;
  message: string;
  title?: string;
  timeOut?: number;
};

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isValidatingForm = false;
  isLoggedIn = signal(false);

  fb = inject(FormBuilder);
  toaster = inject(ToastrService);
  userService = inject(UserService);

  isLoading: Boolean = false;
  formData = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (!this.isValidatingForm) this.isValidatingForm = true;
    if (this.isLoading) return;

    if (this.formData.valid) {
      this.isLoading = true;
      this.toaster.clear();
      const { email, password } = this.formData.value;

      this.userService.login(email as string, password as string).subscribe({
        next: (response) => {
          if (Array.isArray(response) && response.length > 0) {
            this.showToast({ type: 'success', message: 'Login successful!' });
          } else {
            this.showToast({ type: 'error', message: 'User not found!' });
          }
        },
        error: (error) => {
          this.showToast({ type: 'error', message: 'Login failed!' });
        },
        complete: () => {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
      });
    }
  }

  showToast({ type, message, title = '', timeOut = 1000 }: IToast) {
    if (type === 'error') {
      this.toaster.error(message, title, { timeOut });
      return;
    }
    this.toaster.success(message, title, { timeOut });
  }
}
