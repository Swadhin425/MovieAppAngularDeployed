import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {Router}   from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

signInForm: FormGroup
  email: string;
  password: string;
  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit() {
    this.signInForm=new FormGroup({
     'email': new FormControl(null,[Validators.required,Validators.email]),
     'password': new FormControl(null, Validators.required)
    });
  }
  // onClick(event) {
  //   event.preventDefault();
  //   const user = {
  //     email: this.email,
  //     password: this.password
  //   };

  //   this.auth.login(user).subscribe((data) => {
  //     console.log(data);
  //     if(data.loginSucess){
  //       this.router.navigate(['/dashboard']);
  //     }

  //   },(err)=>{
  //     console.log(err)
  //   });

  // }
  onSubmit(){
    console.log(this.signInForm);
    const user = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    };

    this.auth.login(user).subscribe((data) => {
      console.log(data);
      if(data.loginSucess){
        this.auth.loogedIn = true;
        this.router.navigate(['/dashboard']);
      }

    }, (err) => {
      console.log(err);
    });
  }

}
