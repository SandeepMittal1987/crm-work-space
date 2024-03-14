import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Link } from 'projects/core-kit/src/public-api';

@Component({
  selector: 'lib-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
@Input() lib : Link;
@Output() crmClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleClick(event: any): void{
    if(this.crmClick.observers.length > 0){
      this.crmClick.emit(event);
    }
  }

}
