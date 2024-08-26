import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { AuctionLiveComponent } from './auction-live/auction-live.component';
import { AuctionBuyComponent } from './auction-buy/auction-buy.component';
import { VendorComponent } from './vendor/vendor.component';
import { CreatenewitemComponent } from './createnewitem/createnewitem.component';
import { UpdateItemComponent } from './uptadeitem/updateitem.component';
import { PostCreateComponent } from './createnewpost/createnewpost.component';
import { MakeOfferComponent } from './make-offer/make-offer.component';
import { OfferListComponent } from './offer-list/offer-list.component';

const routes: Routes = [

  {
    path: 'auctionlive/:id', component: AuctionLiveComponent
  },
  {
    path: 'auctionbuy/:id', component: AuctionBuyComponent
  },
  {
    path: 'vendor', component: VendorComponent
  },
  {
    path: 'createnewitem', component: CreatenewitemComponent
  },
  {
    path: 'createnewpost', component: PostCreateComponent
  },
  {
    path: 'make-offer/:id', component: MakeOfferComponent
  },
  {
    path: 'updateitem/:id', component:  UpdateItemComponent
  },
  {
    path: 'offer-list/:id', component:  OfferListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
