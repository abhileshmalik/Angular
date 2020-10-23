import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  genders = ['Male', 'Female', 'Others' ];
  signupForm: FormGroup;
  forbiddenUsernames = ['admin', 'abhilesh'];

  constructor(private http: HttpClient, private formBuilder: FormBuilder  ) { }

  ngOnInit() {

    this.signupForm = new FormGroup ({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)] ),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(32) ] ),
      'confirmpassword': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(32) ] ),
      'gender': new FormControl('Male'),
      'age': new FormControl(null, [Validators.required, Validators.min(18)])
    });

  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1 ) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }

  onSubmit() {
    //console.log(this.signupForm);
    
    this.http.post(
      'https://procart-angular.firebaseio.com/userdata.json', 
      this.signupForm.value
    ).subscribe(responseData => {
      console.log(responseData);
      alert("User Registration Successful");
      this.signupForm.reset();

    }, error => {
      console.log(error);
    });

  }

  onReset() {
    this.signupForm.reset(); 
  }

}
