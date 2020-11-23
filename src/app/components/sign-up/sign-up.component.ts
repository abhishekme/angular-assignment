import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
  providers: [AppService, ToastrService]
})
export class SignUpComponent implements OnInit {

  userData:any = {};
  changePasswordForm: any = [];
  public checkCaptchaValidation:boolean = false;
  public checkSecurity:boolean = false;
  public passblock: boolean = false;
  public passConfBlock: boolean = false;
  loader:boolean = true;

  constructor(public router: Router,public toastr: ToastrService, public Service:AppService) { }


  updateValue(string:any){
    console.log(string);
   this.userData.fname = string.charAt(0).toUpperCase() + string.slice(1);
  }
  ngOnInit() {

    this.changePasswordForm.password   = '';
    this.changePasswordForm.cpassword   = '';
    this.changePasswordForm.passwordStrength  = {};
    this.changePasswordForm.passwordStrength['password'] = {};
    this.changePasswordForm.passwordStrength['cpassword'] = {};

    this.userData.fname = '';
    this.userData.lname = '';
    this.userData.mobile = '';
    this.userData.code = '';

  }

  checkPassword(event: any, type: string){
    var theObject = event;
    var theValue  = theObject.target.value;
    this.changePasswordForm.passwordStrength[type] = {};
    this.changePasswordForm.passwordStrength[type]['pcLengthValue'] = 0;
    this.changePasswordForm.passwordStrength[type]['pcUpperValue'] = 0;
    this.changePasswordForm.passwordStrength[type]['pcLowerValue'] = 0;
    this.changePasswordForm.passwordStrength[type]['pcNumberValue'] = 0;
    this.changePasswordForm.passwordStrength[type]['pcSpecialValue'] = 0;

    let lengthCharacters      = /^([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]){9,}$/;
    let upperCaseCharacters   = /[A-Z]+/g;
    let lowerCaseCharacters   = /[a-z]+/g;
    let numberCharacters      = /[0-9]+/g;
    let specialCharacters     = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (lengthCharacters.test(theValue) === true) {
      this.changePasswordForm.passwordStrength[type]['pcLengthValue']   = 1;
    }
    if(upperCaseCharacters.test(theValue) === true) {
      this.changePasswordForm.passwordStrength[type]['pcUpperValue']    = 1;
    }
    if (lowerCaseCharacters.test(theValue) === true) {
      this.changePasswordForm.passwordStrength[type]['pcLowerValue']    = 1;
    }
    if (numberCharacters.test(theValue) === true) {
      this.changePasswordForm.passwordStrength[type]['pcNumberValue']   = 1;
    }
    if (specialCharacters.test(theValue) === true) {
      this.changePasswordForm.passwordStrength[type]['pcSpecialValue']  = 1;
      this.changePasswordForm.passwordStrength[type]['checkPassword']   = 1;
    }
}

checkStrongPasswordType(type: string){
  var checkedType = true;
  var typeObject  = this.changePasswordForm.passwordStrength[type];
  for (const [key, value] of Object.entries(typeObject)) {
      if(!value && key != undefined){
        return false;
      }
  }
  return checkedType;
}

isValid()
  {
    if(this.userData.fname  == '' ){
      this.toastr.error("First Name can't be empty","Validation Error", {timeOut: 3000});
      return false;
    }

    if(this.userData.lname  == '' ){
      this.toastr.error("Last Name can't be empty","Validation Error", {timeOut: 3000});
      return false;
    }

    if(this.userData.email  == '' ){
      this.toastr.error("Email can't be empty","Validation Error", {timeOut: 3000});
      return false;
    }

    if(!this.Service.checkInput('email',this.userData.email )){
      this.toastr.error('Email is Invalid','Validation Error', {timeOut: 3000});
      return false;
    }
    
    if(this.changePasswordForm.password  == '' ){
      this.toastr.error("Password can't be empty","Validation Error", {timeOut: 3000});
      return false;
    }
    if(this.changePasswordForm.cpassword  == '' ){
      this.toastr.error("Confirm Password can't be empty","Validation Error", {timeOut: 3000});
      return false;
    }
    
    if(!this.checkStrongPasswordType('password')){
      this.toastr.error('Password strength failed','Validation Error', {timeOut: 3000});
      return false;
    }
    if(!this.checkStrongPasswordType('cpassword')){
      this.toastr.error('Confirm Password strength failed','Validation Error', {timeOut: 3000});
      return false;
    }

    if(this.changePasswordForm.password  != '' && 
    this.changePasswordForm.cpassword != '' &&
    this.changePasswordForm.cpassword != this.changePasswordForm.password){
      this.toastr.error('Confirm password not match.','Validation Error', {timeOut: 3000});
      return false;
    }
    
    return true;
  }

  passwordDisplay(type: string){
    if(type === 'normal'){
      this.passblock = !this.passblock;
    }else{
      this.passConfBlock = !this.passConfBlock;
    }
  }

  onSubmit(ngForm:any) {
    // //console.log(this.userData.cpassword,'password');
    if(this.isValid()){
      this.loader = false;
      this.userData.password = this.changePasswordForm.password;
      console.log(this.userData);
      this.Service.post(this.userData)
        .subscribe(
          res => {
            this.loader = true;
            if(res) {
              this.toastr.success('Registration Successfully');
              this.router.navigateByUrl('/sign-in');
            }else{
              
              this.toastr.warning(res['msg'], '');
            }
          });
      ////console.log("validation done...resetting password...");
    }
  }
}
