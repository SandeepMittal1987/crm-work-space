import { NgOtpInputConfig } from "ng-otp-input";
import { Button, Link, DynamicLabelControl, ImageControl, InputControl, StaticLabelControl } from "../../public-api";
import { Icore } from "../models/interfaces/icore";

export class ForgotPassword implements Icore {
    isHide= false;
    width= '';
    crossBtn= new ImageControl('','cross');
    companyLogo = new ImageControl('','company-logo');
    passwordLock = new ImageControl('','password-lock');
    forgotTitle= new StaticLabelControl();
    forgotHint= new StaticLabelControl();
    emailMobile= new StaticLabelControl();
    emailInput = new InputControl('email','', true);
    backbutton= new ImageControl ('', 'back-btn');
    backText= new StaticLabelControl();
    nextBtn = new Button('','');
    isinputDetailsShow: boolean;
    isOtpDetails: boolean;
    otpTitle= new StaticLabelControl();
    otpHint = new DynamicLabelControl('hint','OTPhint.FormatText','otp-hint',[],[]);
    otpNextBtn= new Button('','');
    resendLink= new Link('');
    resendText = new StaticLabelControl();
    optError = new StaticLabelControl();
    isNewPassword = false;
    resetTitle = new StaticLabelControl();
    resetHint = new StaticLabelControl();
    newPassword = new StaticLabelControl();
    confirmPassword = new StaticLabelControl();
    newPwd!:InputControl;
    resetPwd!: InputControl;
    resetPassword: Button;

    otpConfig :NgOtpInputConfig = {
        allowNumbersOnly: true,
        length: 6,
        isPasswordInput: false,
        disableAutoFocus: false,
        placeholder: ''
      };
    otp: number;
    constructor(
        public id: string = '',
        public title: string = '',){
    }
}
