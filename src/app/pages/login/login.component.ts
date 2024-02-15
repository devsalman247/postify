import { Component, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoggedIn = signal(false);

  fb = inject(FormBuilder);
  toaster = inject(ToastrService);
  userService = inject(UserService);

  isLoading: Boolean = false;
  formData = this.fb.nonNullable.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.isLoading) return;

    if (this.formData.valid) {
      this.isLoading = true;
      const { email, password } = this.formData.value;

      this.userService.login(email as string, password as string).subscribe({
        next: (response) => {
          console.log(response);
          this.toaster.success('Login successful!');
          this.isLoading = false;
        },
        error: (error) => {
          this.toaster.error('Login failed!');
          this.isLoading = false;
        },
      });
    } else {
      this.formData.markAllAsTouched();
    }
  }
}
