import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService, Role } from '@core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
    selector: 'app-locked',
    templateUrl: './locked.component.html',
    styleUrls: ['./locked.component.scss'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
    ]
})
export class LockedComponent implements OnInit {
  authForm!: UntypedFormGroup;
  user : any
  submitted = false;
  userImg!: string;
  userFullName!: string;
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
    this.user = this.authService.currentUserValue;
    if (this.user) {
      this.userImg = this.user.img;
      this.userFullName = this.user.firstName + ' ' + this.user.lastName;
    }
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      const role = this.user.role;
      if (role === Role.All || role === Role.Admin) {
        this.router.navigate(['/admin/dashboard/main']);
      } else if (role === Role.Doctor) {
        this.router.navigate(['/doctor/dashboard']);
      } else if (role === Role.Patient) {
        this.router.navigate(['/patient/dashboard']);
      } else {
        this.router.navigate(['/authentication/signin']);
      }
    }
  }
}
