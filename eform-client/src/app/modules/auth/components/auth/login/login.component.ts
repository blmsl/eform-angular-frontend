import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthResponseModel, GoogleAuthenticatorModel, LoginRequestModel} from 'src/app/common/models/auth';
import {LoginPageSettingsModel} from 'src/app/common/models/settings';
import {AppSettingsService} from 'src/app/common/services/app-settings';
import {AuthService, LocaleService, UserSettingsService} from 'src/app/common/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  secretKey: AbstractControl;
  code: AbstractControl;

  googleAuthenticatorModel: GoogleAuthenticatorModel = new GoogleAuthenticatorModel;

  showLoginForm = true;
  showAdminResetForm = false;
  error: string;

  spinnerStatus = false;

  constructor(private router: Router,
              private authService: AuthService,
              private settingsService: AppSettingsService,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private localeService: LocaleService,
              private userSettings: UserSettingsService) {
  }

  login() {
    this.spinnerStatus = true;
    this.authService.login(new LoginRequestModel(this.formLogin.getRawValue()))
      .subscribe((result: AuthResponseModel) => {
          localStorage.setItem('currentAuth', JSON.stringify(result));
          this.userSettings.getUserSettings().subscribe((data) => {
            localStorage.setItem('locale', data.model.locale);
            this.router.navigate(['/']).then();
          });
          this.spinnerStatus = false;
        },
        (error) => {
          this.error = error;
          this.spinnerStatus = false;
        },
      );
  }

  submitLoginForm(): void {
    const loginRequestModel = new LoginRequestModel(this.formLogin.getRawValue());
    this.spinnerStatus = true;
    this.authService.loginAndGetGoogleAuthKey(loginRequestModel)
      .subscribe((result) => {
        if (result.success) {
          // check if two factor is enabled
          if (result.model) {
            this.googleAuthenticatorModel = result.model;
            const cypher = btoa(JSON.stringify({loginData: loginRequestModel, googleAuthData: result.model}));
            this.router.navigate(['auth/google-authenticator', cypher]).then();
          } else {
            this.login();
          }
        }
        this.spinnerStatus = false;
      });
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: [
        '',
        Validators.required,
      ],
      password: [
        '',
        Validators.required,
      ],
    });
  }
}
