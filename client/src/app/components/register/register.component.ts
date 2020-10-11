import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router}   from '@angular/router';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private auth: AuthService,private router: Router ){ }

  ngOnInit() {

  }

  // onClick(e) {
  //   e.preventDefault();
  //   const user = {
  //     name: this.firstname,
  //     lastname:this.lastname,
  //     email: this.email,
  //     password: this.password
  //   };

  //   this.auth.register(user).subscribe((data) => {
  //     console.log(data );
  //     this.router.navigate(['/dashboard']);
  //   });
  // }

  onSubmit(form: NgForm){
    const user = {
      name: form.form.value.firstname,
      lastname: form.form.value.lastname,
      email: form.form.value.email,
      password: form.form.value.password,
      image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
    };
      console.log(user);
    this.auth.register(user).subscribe((data) => {
      console.log(data );
      this.router.navigate(['/login']);
    });
  }

}
