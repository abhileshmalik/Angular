import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  isLoading = false;
  error: string = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.loginForm = new FormGroup ({
      'email': new FormControl(null, [Validators.required, Validators.email ]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(32) ] )
    });

  }

  onSubmit() {
    // console.log(this.loginForm.value.email);
    
    if(!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    authObs = this.authService.login(email, password);

    // this.authService.signup(email, password).subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //   },
    //   error => {
    //     console.log(error);
    //     this.error = 'An Error Occured!';
    //     this.isLoading = false;
    //   }
    // )

    authObs = this.authService.login(email, password);

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.loginForm.reset(); 

  }

  onReset() {
    this.loginForm.reset(); 
    this.error = null;
  }

}
