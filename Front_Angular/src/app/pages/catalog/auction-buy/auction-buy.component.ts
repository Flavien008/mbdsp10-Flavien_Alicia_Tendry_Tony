import { Component, OnInit } from '@angular/core';

//Data Get
import { collection } from '../auction-live/data';

// Swiper Slider
// import { SwiperOptions } from 'swiper';
import { favorite } from '../../account/favorite/data';

@Component({
  selector: 'app-auction-buy',
  templateUrl: './auction-buy.component.html',
  styleUrls: ['./auction-buy.component.scss']
})

// AuctionBuy Component
export class AuctionBuyComponent implements OnInit {

  breadCrumbItems!: any;
  morecollection: any;

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
      { label: 'Single Project', active: true, link: '/Single Project' }
    ];

    //Fetch Data
    this.morecollection = collection
  }

  /**
 * creator Swiper setting
 */
  Collection = {
    slidesToShow: 2, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll when navigating
    arrows: true,
    infinite: false, // Show navigation arrows
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

  // Add Favorite
  addfavorite(id: any) {
    this.morecollection[id].is_like = '1'
    favorite.push(this.morecollection[id])
  }

  comments = [
    {
      avatar: 'path_to_avatar1',
      author: 'Tendry Arivony',
      time: '1 sem',
      content: 'Très belle initiative',
      replies: [
        {
          avatar: 'path_to_reply_avatar1',
          author: 'Clarra Anna Smirth',
          time: '2 j',
          content: 'Merci beaucoup'
        }
      ]
    },
    {
      avatar: 'path_to_avatar2',
      author: 'Flavien Rakotoarison',
      time: '5 j',
      content: 'Merci beaucoup',
      replies: []
    },
    {
      avatar: 'path_to_avatar3',
      author: 'Alicia',
      time: '5 j',
      content: 'Merci',
      replies: []
    }
  ];
  currentUser = {
    name: 'Tendry Arivony',
    avatar: 'path_to_current_user_avatar'
  };

}
