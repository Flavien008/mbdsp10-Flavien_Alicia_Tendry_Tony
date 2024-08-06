import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Ajout de NgbModule
import { NgbTooltipModule, NgbRatingModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

//Routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CatalogModule } from './catalog/catalog.module';
import { AccountModule } from './account/account.module';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    SlickCarouselModule,
    NgbRatingModule,
    NgbDropdownModule,
    RouterModule,
    FormsModule,
    CatalogModule,
    ReactiveFormsModule,
    AccountModule,
    NgbTooltipModule,
    NgbModule // Ajout de NgbModule
  ]
})
export class PagesModule { }
