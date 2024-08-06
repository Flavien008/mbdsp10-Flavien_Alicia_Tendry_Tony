import { Component, OnInit } from '@angular/core';

import { created, collections, like, activity } from './data';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})

// Vendor Component
export class VendorComponent implements OnInit {

  breadCrumbItems!: any;
  created: any;
  collections: any;
  liked: any;
  activities: any;

  // set the current year
  year: number = new Date().getFullYear();
  private _diff?: any;
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;
  timer: any;

  constructor() { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Remove header user profile and create button
    document.querySelector('.user')?.classList.add('d-none')
    document.querySelector('.create')?.classList.add('d-none')
    document.querySelector('.craeteitem')?.classList.add('d-none')

    /**
   * BreadCrumb
   */
    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Marketplace', link: '/' },
      { label: 'Vendor Page', active: true, link: '/Vendor Page' }
    ];

    //Fetch Data
    this.created = created
    this.collections = collections
    this.liked = like
    this.activities = activity
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

  // Add Favorite
  addfavorite(id: any) {
    this.created[id].is_like = '1'
    like.push(this.created[id])
  }

  // Remove Favorite
  removefavorite(id: any) {
    this.liked[id].is_like = '0'
    this.liked.splice(id, 1)
  }

}
