import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    imports: [
        RouterLink,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
    ]
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  user: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required],
    });
    this.user = this.authService.currentUserValue
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.authForm.invalid) {
      this.error = 'Email and Password not valid!';
      this.loading = false;
      return;
    }

    this.subs.sink = this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: (res) => {
          if (res) {
            const role = res.role;
            console.log('User role:', role);
            if (role === 'Superadmin'){
              this.router.navigate(['/superadmin/dashboard'])
            }else if (role === 'Admin') {
              this.router.navigate(['/admin/dashboard/dashboard2']);
            } else if (role === 'Doctor') {
              this.router.navigate(['/doctor/dashboard']);
            } else if (role === 'Patient') {
              this.router.navigate(['/patient/dashboard']);
            } else {
              this.router.navigate(['/authentication/signin']);
            }

            this.loading = false;
          } else {
            this.error = 'Invalid Login';
          }
        },
        error: (error) => {
          this.error = error;
          this.submitted = false;
          this.loading = false;
        },
      });
  }

}
