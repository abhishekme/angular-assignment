import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

  signin: FormGroup;
  passblock:boolean = false;
  urserList:any;

  constructor(public signinBuild: FormBuilder,public toastr: ToastrService, public Service:AppService, public router:Router) { 
    this.signin = new FormGroup({
      email:    new FormControl('', 
      [Validators.required,Validators.pattern("^[_a-z0-9-\\+]+(\\.[_a-z0-9-]+)*@" + "[a-z0-9-]+(\\.[a-z0-9]+)*(\\.[a-z]{2,})$")]),
      password: new FormControl('')
    });
  }

  passwordDisplay(){
    this.passblock = !this.passblock;
 }

  ngOnInit() {

  }

  isValid() {
    if(this.signin.get('email').value  == '' ){
      this.toastr.error("First Name can't be empty","Validation Error", {timeOut: 3000});
      return false;
    }
    if(this.signin.get('password').value  == '' ){
      this.toastr.error("Password can't be empty","Validation Error", {timeOut: 3000});
      return false;
    }
  }

  createLogin() {
    var email = this.signin.get('email').value;
    var password = this.signin.get('password').value;

    // if(this.isValid()){
      // console.log('res');
      this.Service.get()
        .subscribe(
          res => {
            this.urserList = res;
            var findEmailpass = this.urserList.find(e => e.email == email && e.password == password);
            if(findEmailpass != undefined) {
              // console.log('test');
              this.router.navigateByUrl('/user-list');
              localStorage.setItem('email',email);
            }else{
              this.toastr.error('Incorrect Email/Password','Validation Error', {timeOut: 3000});
            }
            
          });
      ////console.log("validation done...resetting password...");
    // }
    console.log(email);
    console.log(password);
  }

}
