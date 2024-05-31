import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, OTranslateService, OUserInfoService, OntimizeService, ServiceResponse } from 'ontimize-web-ngx';
import { MainService } from 'src/app/shared/services/main.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  public registerForm: UntypedFormGroup = new UntypedFormGroup({});
  public userCtrl: UntypedFormControl = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16),
    Validators.pattern('^[a-zA-Z0-9_]*$')
  ]);
  public pwdCtrl: UntypedFormControl = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")
  ]);
  public pwdCtrl2: UntypedFormControl = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  public usernameCtrl: UntypedFormControl = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
    Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜçÇ -]*$')
  ]);
  public userSurnameCtrl: UntypedFormControl = new UntypedFormControl('', [
    Validators.required, Validators.minLength(3),
    Validators.maxLength(50),
    Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜçÇ -]*$')
  ]);
  public userEmailCtrl: UntypedFormControl = new UntypedFormControl('', [
    Validators.required,
    Validators.email
  ]);
  public userPhoneCtrl: UntypedFormControl = new UntypedFormControl('', Validators.pattern('^[6-9][0-9]{8}$'));
  public userDateCtrl: UntypedFormControl = new UntypedFormControl('', [
    Validators.required,
    this.ageValidator()
  ]);
  public userGenderCtrl: UntypedFormControl = new UntypedFormControl('', [
    Validators.required,
  ]);

  @Input() item: any;
  service: OntimizeService;
  gender: any = {};
  redirect = '';
  adminRole = 'admin';
  userRole = 'user';
  sellerRole = 'seller';
  genderData = [
    { 'UGE_ID': 1, 'UGE_NAME': 'MAN' },
    { 'UGE_ID': 2, 'UGE_NAME': 'WOMAN' },
    { 'UGE_ID': 3, 'UGE_NAME': 'OTHER' },
    { 'UGE_ID': 4, 'UGE_NAME': 'PREFER_NOT_ANSWER' },
  ];

  constructor(
    private router: Router,
    protected injector: Injector,
    protected translate: OTranslateService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(MainService) private mainService: MainService,
    @Inject(OUserInfoService) private oUserInfoService: OUserInfoService,
    @Inject(UserInfoService) private userInfoService: UserInfoService,
  ) {
    this.service = this.injector.get(OntimizeService)
    this.translate = this.injector.get(OTranslateService);
  }

  ngOnInit(): void {
    this.registerForm.addControl('usr_login', this.userCtrl);
    this.registerForm.addControl('usr_password', this.pwdCtrl);
    this.registerForm.addControl('usr_password2', this.pwdCtrl2);
    this.registerForm.addControl('usr_name', this.usernameCtrl);
    this.registerForm.addControl('usr_surname', this.userSurnameCtrl);
    this.registerForm.addControl('upr_birthdate', this.userDateCtrl);
    this.registerForm.addControl('usr_email', this.userEmailCtrl);
    this.registerForm.addControl('usr_phone', this.userPhoneCtrl);
    this.registerForm.addControl('uge_id', this.userGenderCtrl);

    const conf = this.service.getDefaultServiceConfiguration('user-genders');
    console.log(conf);
    this.service.configureService(conf);
    this.service.query({}, ["UGE_ID", "UGE_NAME"], "userGender")
      .subscribe((data) => {
        console.log(data);
        if (data.data.length > 0) {
          this.gender = data.data[0];
          
        }
      });


  }

  register() {
    if (this.registerForm.valid) {
      if (this.passwordMatchValidator()) {
        this.insertUser(this.userRole);
      } else {
        const text = this.translate.get('PASSWORDS_DO_NOT_MATCH');
        const button = this.translate.get('CONFIRMATION_REGISTER_BUTTON');

        Swal.fire({
          title: "ERROR",
          text: text,
          icon: 'error',
          confirmButtonText: button,
          confirmButtonColor: '#f8b88c',
        });
      }
    }
  }

  passwordMatchValidator(): boolean {
    return this.registerForm.value.usr_password === this.registerForm.value.usr_password2;
  }

  insertUser(userRole: string) {
    const login = this.registerForm.value.usr_login;
    const password = this.registerForm.value.usr_password;

    const data = {
      "USR_LOGIN": this.registerForm.value.usr_login,
      "USR_PASSWORD": this.registerForm.value.usr_password,
      "USR_NAME": this.registerForm.value.usr_name,
      "USR_SURNAME": this.registerForm.value.usr_surname,
      "USR_EMAIL": this.registerForm.value.usr_email,
      "USR_PHONE": this.registerForm.value.usr_phone,
      "UPR_BIRTHDATE": this.registerForm.value.upr_birthdate._i,
      "UGE_ID": this.registerForm.value.uge_id
    }
    console.log(data);
    console.log(data.UPR_BIRTHDATE._i);
    console.log(data.UGE_ID);

    const conf = this.service.getDefaultServiceConfiguration('users');
    this.service.configureService(conf);
    this.service.insert(data, "clientRole")
      .subscribe((resp) => {
        if (resp.code === 0) {

          this.registerLogin(login, password)

          const title = this.translate.get('CONFIRMATION_REGISTER_TITLE');
          const text = this.translate.get('CONFIRMATION_REGISTER_TEXT');
          const button = this.translate.get('CONFIRMATION_REGISTER_BUTTON');

          Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: button,
            confirmButtonColor: '#f8b88c',
          });
        }
      }, this.handleError)
  }

  private handleError(error) {

    switch (error.status) {
      case 500:
        Swal.fire({
          title: "ERROR",
          text: "Duplicated user",
          icon: 'error',
          confirmButtonText: "Cancel",
          confirmButtonColor: '#f8b88c',
        });
        break;
      default: break;
    }
  }

  registerLogin(userName: string, password: string) {
    this.authService.login(userName, password)
      .subscribe(() => {
        this.loadUserInfo();
        this.router.navigate([this.redirect]);
      })
  }

  private loadUserInfo() {
    this.mainService.getUserInfo()
      .subscribe(
        (result: ServiceResponse) => {
          this.userInfoService.storeUserInfo(result.data);
          this.oUserInfoService.setUserInfo({
            username: result.data['usr_name'],
          });
        }
      );
  }

  ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthdate = new Date(control.value);
      const cutoffDate = new Date();
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 18);

      return birthdate <= cutoffDate ? null : { 'ageValidator': { value: control.value } };
    };
  }
}