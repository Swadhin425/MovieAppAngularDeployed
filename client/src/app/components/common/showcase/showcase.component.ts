import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
  @Input()  imgSrc: string;
  constructor() { }

  ngOnInit() {
  }

}
