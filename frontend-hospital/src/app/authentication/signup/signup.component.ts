import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'; import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // pour date native
import { MatFormFieldModule } from '@angular/material/form-field';
import { last } from 'rxjs';
import { h } from "../../../../node_modules/@angular/material/module.d-CyLvt0Fz";
import { AuthService } from '@core';
import { RegisterPayload } from '@core/models/register-payload';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
  ]

})
export class SignupComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
      cni: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
      date_of_birth: ['', Validators.required],
      city_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    },
      { Validators: this.passwordsMatchValidator }
    );

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  passwordsMatchValidator(form: UntypedFormGroup) {
    const password = form.get('password')?.value;
    const cpassword = form.get('cpassword')?.value;
    return password === cpassword ? null : { passwordsMismatch: true };
  }

  get f() {
    return this.authForm.controls;
  }
  onSubmit() {

    this.submitted = true;
    if (this.authForm.invalid) return;

    const rawDate = this.authForm.value.date_of_birth;
    const formattedDate = new Date(rawDate).toISOString().split('T')[0];

    const user = {
      first_name: this.authForm.value.first_name,
      last_name: this.authForm.value.last_name,
      address: this.authForm.value.address,
      phone: this.authForm.value.phone,
      cni: this.authForm.value.cni,
      date_of_birth: formattedDate,
      city_of_birth: this.authForm.value.city_of_birth,
      gender: this.authForm.value.gender,
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      password_confirmation: this.authForm.value.cpassword,
      role: 'Patient'
    } as RegisterPayload;

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('Inscription réussie !', response);
        if (response.role === 'Patient') {
          this.router.navigate(['/patient/dashboard']);
        }
      },
      error: (err) => {
        console.error('Erreur inscription :', err);
      }
    });
  }

}
