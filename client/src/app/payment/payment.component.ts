import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const httpOption={ headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService,private http:HttpClient) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((obj) => {
        if (obj) {
          // Use the token
          console.log(obj.token.id);
          this.http.post('http://localhost:5004/pay', { token: obj.token.id + 'hff', amount: 50000 }, httpOption).subscribe((result) => {
            console.log(result);
            console.log("payment successful");
            if (result === true) {
              console.log("payment successful");
            }
          })
        } else if (obj.error) {
          // Error creating the token
          console.log(obj.error.message);


        }
      });
  }

}
