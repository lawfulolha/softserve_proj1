import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInput} from '@angular/material/input';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    useremail : ['', [ Validators.required,
      Validators.email]],
    // , Validators.pattern(/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/)]],
    userpassword : ['', [Validators.required, Validators.minLength(6)]]
  });
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  previousRoute: string;
  auth: any = {};
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private formBuilder: FormBuilder,
              private router: Router) {}

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];

    const result = control.invalid && control.touched;
    return result;
  }
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if ( this.isLoggedIn === true ) {
        this.router.navigate(['home']);
      }
  }

  onSubmit() {
    const cred = {
    email : this.loginForm.value.useremail,
    password : this.loginForm.value.userpassword};
    this.authService.login(cred).subscribe(
        data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
