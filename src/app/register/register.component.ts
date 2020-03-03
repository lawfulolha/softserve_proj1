import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {TokenStorageService} from '../services/token-storage.service';
import {MatInput} from '@angular/material/input';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  errorMessage = '';
  isValid = true;
  registerForm = this.formBuilder.group({
    username : ['', Validators.required],
    useremail : ['', [ Validators.required, Validators.email]],
    userpassword : ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.controls[controlName];

    const result = control.invalid;
    this.isValid = result;
    return result;
  }
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorage.getToken();
      if ( this.isLoggedIn === true ) {
        this.router.navigate(['home']);
      }
    }

  onSubmit() {
    this.authService.register({username: this.registerForm.value.username,
      email: this.registerForm.value.useremail,
      password: this.registerForm.value.userpassword})
      .subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.router.navigate(['login']);
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
