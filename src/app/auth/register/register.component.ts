import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    'fullname': ['', [Validators.required]],
    'username': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]],
  }, { validator: this.matchingPasswords});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  matchingPasswords(group: FormGroup) {
    if (group) {
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if (password1 === password2) {
        return null;
      }
    }
    return { matching: false };
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.formRegister.value);
    const u: User = {
      ...this.formRegister.value,
      password: this.formRegister.value.password1
    };
    this.authService.register(u)
      .subscribe((u) => {
        this.snackBar.open(
          'Registrado com sucesso',
          'OK', { duration: 2000 }
        );
        this.router.navigateByUrl('/auth/login');
      },
      (err) => {
        console.error(err);
        this.snackBar.open(err, 'OK', { duration: 2000 });
      });
  }

}
