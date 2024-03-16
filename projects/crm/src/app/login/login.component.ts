import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../core/services/util-service.service';
import {
  ForgotPasswordComponent,
  LoginModel,
  PopupService,
  StaticLabelControl,
} from 'projects/core-kit/src/public-api';
import { ForgotPassword } from 'projects/core-kit/src/lib/widgets/forgot-password';
import { ApiService } from '../core/services/api-service/api.service';
import { AppConfigService } from '../core/services/app-config.service';
import { catchError, map } from 'rxjs/operators';
import { UiMessageService } from '../core/services/ui-message-service/ui-message.service';
import { NgOtpInputConfig } from 'ng-otp-input';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  crm: LoginModel;
  forgotPassword: ForgotPassword;
  constructor(
    private appLoader: ConfigService,
    private modalService: PopupService,
    private apiService: ApiService,
    private appConfigService: AppConfigService,
    private uiMessage: UiMessageService
  ) {
    this.crm = new LoginModel();
    this.declareLanguage();
  }

  ngOnInit() {}

  declareLanguage() {
    this.crm.language.dropdownListItems = [
      { code: 'en', value: 'EN' },
      { code: 'ru', value: 'RU' },
    ];
    this.crm.language.appearance = '';
    this.crm.language.controlId = 'languages';
    this.crm.language.label = '';
    this.crm.language.isMandatory = true;
    this.crm.language.value = this.appLoader.getLocaleId();
  }

  forgotPopup() {
    this.modalService.dialogConfig.panelClass = 'forgotPassword';
    this.forgotPassword = new ForgotPassword();
    const modalInstance = this.modalService.open(ForgotPasswordComponent);
    modalInstance.disableClose = false;
    const data = this.crm.forgotPasswordPopup(this.forgotPassword);
    modalInstance.componentInstance.lib = data;
    modalInstance.componentInstance.nextEvent.subscribe((e) => {
      const forgotInput = modalInstance.componentInstance.lib.emailInput.value ? modalInstance.componentInstance.lib.emailInput.value : '';
      let isInValidForgotInput = false;
      if((new String(forgotInput).length>10 && forgotInput.indexOf('@')==-1) || (isNaN(Number(forgotInput)) && new String(forgotInput).length<=10)){
        isInValidForgotInput = true;
        modalInstance.componentInstance.lib.emailInput.tooltipMsg = 'LABELS.USERIDEMPTYERROR';
      }
      if(forgotInput && !isInValidForgotInput){
        modalInstance.componentInstance.lib.emailInput.tooltipMsg ='';
        let url = this.appConfigService.URLS.forgotPassword.toString();
        url= url.replace('{email}',forgotInput);
        this.apiService
          .GET(url)
          .pipe(catchError((err) => {
            console.log(err);
            return err;
          }))
          .subscribe({
            next: (validate) => {
              modalInstance.componentInstance.lib = this.crm.emailOtp(
                modalInstance.componentInstance.lib
              );
              this.uiMessage.success('OTPSENT');
            },
            error: (e) => {
              console.log('OTP API error', e);
            },
          });
      }

    });
    modalInstance.componentInstance.otpNxtClick.subscribe((e) => {
      if(modalInstance.componentInstance.lib.otp){
        if(new String(modalInstance.componentInstance.lib.otp).length==6){
          modalInstance.componentInstance.lib.otpConfig.inputClass='';
          modalInstance.componentInstance.lib.optError = new StaticLabelControl('',"");
          const url = this.appConfigService.URLS.otpValidate.toString();
          const params = this.otpGetParams(modalInstance.componentInstance.lib);
          this.apiService.POST(url, params).subscribe((validate) => {
            modalInstance.componentInstance.lib = this.crm.resetPassword(
              modalInstance.componentInstance.lib
            );
            this.uiMessage.success('OTPVERIFIED');
          });
        } else {
          modalInstance.componentInstance.lib.otpConfig.inputClass='otp-error';
          modalInstance.componentInstance.lib.optError = new StaticLabelControl('',"LABELS.OTPERROR");
        }
      } 
    });

    modalInstance.componentInstance.otpBack.subscribe((e)=>{
      modalInstance.componentInstance.lib = this.crm.forgotPasswordPopup(
        modalInstance.componentInstance.lib
      );
    })

    modalInstance.componentInstance.resetPassword.subscribe((e) => {
      let isInvalidReset = false; 
      if(modalInstance.componentInstance.lib.newPwd.value ==''){
        isInvalidReset = true;
        modalInstance.componentInstance.lib.newPwd.tooltipMsg = "LABELS.NEWPASSWORDERROR";
      }
      if(modalInstance.componentInstance.lib.resetPwd.value =='' || modalInstance.componentInstance.lib.resetPwd.value !== modalInstance.componentInstance.lib.newPwd.value){
        isInvalidReset = true;
        modalInstance.componentInstance.lib.resetPwd.tooltipMsg = "LABELS.CONFIRMPASSWORDERROR";
      }
      if(!isInvalidReset){
        const url = this.appConfigService.URLS.otpValidate.toString();
        const params = this.changePwdParams(modalInstance.componentInstance.lib);
        this.apiService.POST(url, params).subscribe((validate) => {
          modalInstance.close();
          this.uiMessage.success('PASSWORDRESET');
        });
      }
    });

    modalInstance.componentInstance.resendClick.subscribe((e) => {
    let url = this.appConfigService.URLS.forgotPassword.toString();
        url= url.replace('{email}',modalInstance.componentInstance.lib.emailInput.value);
        this.apiService
          .GET(url)
          .pipe(catchError((err) => {
            console.log(err);
            return err;
          }))
          .subscribe({
            next: (validate) => {
              this.uiMessage.success('OTPSENT');
            },
            error: (e) => {
              console.log('OTP API error', e);
            },
          });
    })
    
  }

  loginClick() {
    if (this.crm.userId.value == '' || this.crm.password.value == '') {
      if (this.crm.userId.value == '') {
        this.crm.userId.isValid = false;
        this.crm.userId.tooltipMsg = 'LABELS.USERIDEMPTYERROR';
      }
      if (this.crm.password.value == '') {
        this.crm.password.isValid = false;
        this.crm.password.tooltipMsg = 'LABELS.PWDEMPTYERROR';
      }
    } else {
      const url = this.appConfigService.URLS.emailLogin.toString();
      const params = this.getParams();
      this.apiService.POST(url, params).subscribe((validate) => {
        this.appConfigService.setAuthTokenAndUser(validate.token);
        this.uiMessage.success('LOGINSUCCESS');
      });
    }
  }

  changePwdParams(resetParams){
    const searchParam: any = {};
    searchParam.newPassword = resetParams.newPwd.value !== '' ? resetParams.newPwd.value : '';
    searchParam.confirmPassword = resetParams.resetPwd.value !== '' ?  resetParams.resetPwd.value : '';
    return searchParam;
  }

  otpGetParams(otpParam){
    const searchParam: any = {};
    searchParam.otp = otpParam.otp ? otpParam.otp : '';
    searchParam.type = otpParam.emailInput.value !== '' ?  otpParam.emailInput.value : '';
    return searchParam;
  }

  private getParams(): any {
    const searchParam: any = {};
    searchParam.email = this.crm.userId.value !== '' ? this.crm.userId.value.indexOf('@') > -1 ? this.crm.userId.value : 'sandeep.mittal@bulkbuyindia.com' : '';
    searchParam.phone = this.crm.userId.value.indexOf('@') == -1 ? this.crm.userId.value : '';
    searchParam.password = this.crm.password.value ? this.crm.password.value : '123456';
    return searchParam;
  }
}
