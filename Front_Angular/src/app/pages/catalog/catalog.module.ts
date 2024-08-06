import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbPaginationModule, NgbTooltipModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

// Range Slider
import { NgxSliderModule } from 'ngx-slider-v2';

// Routing
import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// component
import { AuctionLiveComponent } from './auction-live/auction-live.component';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

//Image Zoom
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { AuctionBuyComponent } from './auction-buy/auction-buy.component';
import { VendorComponent } from './vendor/vendor.component';
import { CreatenewitemComponent } from './createnewitem/createnewitem.component';

//Drop Zone
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AuctionLiveComponent,
    AuctionBuyComponent,
    VendorComponent,
    CreatenewitemComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgxSliderModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbNavModule,
    SlickCarouselModule,
    NgxImageZoomModule,
    NgxDropzoneModule
  ]
})
export class CatalogModule { }
