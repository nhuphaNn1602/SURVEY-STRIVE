import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { authActions } from './../../../core/store/actions';
import { AppState } from './../../../core/store/app.state';
import authSelectors from './../../../core/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  private subscription = new Subscription();

  constructor(
    private router: Router, 
    private toastr: ToastrService,
    private store: Store<AppState>
  ) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });

    this.subscription.add(
      this.store.select(authSelectors.selectCurrentAuth).subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']); // Điều hướng sau khi đăng nhập thành công
        }
      })
    );

    this.subscription.add(
      this.store.select(authSelectors.selectIsAuthError).subscribe(error => {
        if (error) {
          this.toastr.error(error);
        }
      })
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(authActions.loginRequest({ username, password }));
    } else {
      this.toastr.error('Please make sure all fields are filled out correctly.');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
