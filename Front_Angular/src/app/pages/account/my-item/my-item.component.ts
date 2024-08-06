import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

// Data Get
import { items } from './data';

@Component({
  selector: 'app-my-item',
  templateUrl: './my-item.component.html',
  styleUrls: ['./my-item.component.scss']
})

// MyItem Component
export class MyItemComponent implements OnInit {

  myitems: any;

  // set the current year
  year: number = new Date().getFullYear();
  private _diff?: any;
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;
  livelength: any;
  liveitem: any = [];
  solditem: any = [];

  constructor() { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Remove header account and wallet button
    document.querySelector('.account')?.classList.add('d-none')
    document.querySelector('.wallet')?.classList.add('d-none')
    document.querySelector('.connectwallet')?.classList.add('d-none')

    //Remove mail subscription footer
    document.querySelector('.footer .bg-dark')?.classList.remove('mt-n10', 'pt-10')
    document.querySelector('.footer.bg-secondary')?.classList.add('d-none')

    // Fetch Data
    this.myitems = items
    this.myitems.filter((item: any) => {
      if (item.status == 'sold') {
        this.solditem.push(item)
      }
      if (item.status == 'live') {
        this.liveitem.push(item)
      }
    })
  }

  /**
  * Count date set
  */
  countdown(time: any) {
    if(Date.parse(time) > Date.parse(new Date().toString())){
      this._diff = Date.parse(time) - Date.parse(new Date().toString());
      this._days = Math.floor(this._diff / (1000 * 60 * 60 * 24));
      this._hours = Math.floor((this._diff / (1000 * 60 * 60)) % 24);
      this._minutes = Math.floor((this._diff / 1000 / 60) % 60);
      this._seconds = Math.floor((this._diff / 1000) % 60);
      return ((this._hours < 10) ? '0' + this._hours : this._hours) + ':' + ((this._minutes < 10) ? '0' + this._minutes : this._minutes) + ':' + ((this._seconds < 10) ? '0' + this._seconds : this._seconds)
    }else{
      return '00:00:00'
    }
  }


}
