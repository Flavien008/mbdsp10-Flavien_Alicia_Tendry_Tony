import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

// Swiper Slider
// import { SwiperOptions } from 'swiper';
import { favorite } from '../../account/favorite/data';

//Data Get
import { collection } from './data';

@Component({
  selector: 'app-auction-live',
  templateUrl: './auction-live.component.html',
  styleUrls: ['./auction-live.component.scss']
})

// AuctionLive Component
export class AuctionLiveComponent implements OnInit {

  breadCrumbItems!: any;
  morecollection!: any;
  name: string;
  // set the current year
  year: number = new Date().getFullYear();
  private _diff?: any;
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  timer: any;
  myThumbnail: any;
  myFullresImage: any;
  auctiontime: any;

  constructor() {
    this.name = 'zoom-image'
    this.myThumbnail = "https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
    this.myFullresImage = "https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";
  }

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
      { label: 'Accueil', link: '/' },
      { label: 'Fiche objet', active: true, link: '/Single Project' }
    ];

    //Fetch Data
    this.morecollection = collection

    // Date Set
    this.auctiontime = "12/12/2023 07:00:00 PM";


  }

  ngAfterViewInit(): void {
    /**
        * Count date set
        */
    interval(1000).pipe(map((x) => {
      this._diff = Date.parse(this.auctiontime) - Date.parse(new Date().toString());
    })).subscribe((x) => {
      this.days = this.getDays(this._diff);
      this.hours = this.getHours(this._diff);
      this.minutes = this.getMinutes(this._diff);
      this.seconds = this.getSeconds(this._diff);
    });
  }

  /**
  * creator Swiper setting
 */
  Collection = {
    slidesToShow: 4, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll when navigating
    arrows: false, // Show navigation arrows
    responsive: [
      {
        breakpoint: 575, // Breakpoint for smaller screens
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768, // Breakpoint for larger screens
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1080, // Breakpoint for larger screens
        settings: {
          slidesToShow: 3
        }
      },
    ]
  };


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

  /**
  * Day Set
  */
  getDays(t: number) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  /**
   * Hours Set
   */
  getHours(t: number) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  /**
   * Minutes set
   */
  getMinutes(t: number) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  /**
   * Secound set
   */
  getSeconds(t: number) {
    return Math.floor((t / 1000) % 60);
  }

  // Add Favorite
  addfavorite(id: any) {
    this.morecollection[id].is_like = '1'
    favorite.push(this.morecollection[id])
  }

}
