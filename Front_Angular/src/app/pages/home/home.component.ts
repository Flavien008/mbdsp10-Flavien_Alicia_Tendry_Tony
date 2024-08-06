import { Component, OnInit } from '@angular/core';

//Data Get
import { HomeService } from './home.service';
import { favorite } from '../account/favorite/data';

// Range Slider
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { HomeModel } from './home.model';
import { Options } from 'ngx-slider-v2';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService, DecimalPipe]
})

// CatalogV1 Component
export class HomeComponent implements OnInit {

  public isCollapsed = true;
  breadCrumbItems!: Array<{}>;
  allproduct: any;

  // Table data
  CatelogList!: Observable<HomeModel[]>;
  total: Observable<number>;

  // set the current year
  year: number = new Date().getFullYear();
  private _diff?: any;
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;
  timer: any;

  constructor(public service: HomeService) {
    this.CatelogList = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Remove header user profile and create button
    document.querySelector('.user')?.classList.add('d-none')
    document.querySelector('.create')?.classList.add('d-none')
    document.querySelector('.craeteitem')?.classList.add('d-none')

    //Fetch Data
    setTimeout(() => {
      this.CatelogList.subscribe(x => {
        this.allproduct = Object.assign([], x);
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1200)

    /**
   * BreadCrumb
   */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'NFT Marketplace', link: '/' },
      { label: 'All NFTs', active: true, link: 'All NFTs' }
    ];
  }


  // Price Slider
  minValue: number = 8;
  maxValue: number = 18;
  options: Options = {
    floor: 0,
    ceil: 30,
    step: 8,
    showTicks: true
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
 * Range Slider Wise Data Filter
 */
  valueChange(value: number, boundary: boolean): void { }

  // Add to Favorite
  addfavorite(id: any) {
    this.allproduct[id].is_like = '1'
    favorite.push(this.allproduct[id])
  }



}
