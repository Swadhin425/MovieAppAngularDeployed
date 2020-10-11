import { Component, OnInit,Input } from '@angular/core';
import {IMAGE_BASE_URL, POSTER_SIZE,API_URL,API_KEY} from '../../../Config';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent implements OnInit {
@Input() cast:any;
imgUrl:string;
  constructor() { }

  ngOnInit() {

    
    this.imgUrl =`${IMAGE_BASE_URL}${POSTER_SIZE}${this.cast.profile_path}`;
  }


}
