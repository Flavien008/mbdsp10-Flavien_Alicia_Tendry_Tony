import { Component, OnInit } from '@angular/core';

//Data Get
import { journey } from './data';

// Swiper Slider
// import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-mailfooter',
  templateUrl: './mailfooter.component.html',
  styleUrls: ['./mailfooter.component.scss']
})

// Mailfooter Component
export class MailfooterComponent implements OnInit {

  NFTJourney: any;

  constructor() { }

  ngOnInit(): void {
    this.NFTJourney = journey
  }

  /**
   * NFT Journey Swiper setting
   */
  NFT = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    dots: false, // ngx-slick-carousel does not use the same pagination configuration as Swiper
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],

  }
}
