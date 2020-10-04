import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, first, map } from 'rxjs/operators';

import { BackendService} from '../../../Services/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  state$: Observable<object>;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private backendSevice: BackendService) { }

  ngOnInit(): void {
   
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      console.log(this.loginForm.value);
      this.loading = true;
      this.backendSevice.loginCheck(this.loginForm.value)
      .pipe(first())
      .subscribe(
        isAuthenticated => {
          if(isAuthenticated){
            localStorage.setItem('isAuthenticated',JSON.stringify(isAuthenticated['username']))
            this.router.navigateByUrl('/channels');
          } else {
            this.loading = false;
            alert('Username or password incorrect');
          }
              
        })
  }
}
