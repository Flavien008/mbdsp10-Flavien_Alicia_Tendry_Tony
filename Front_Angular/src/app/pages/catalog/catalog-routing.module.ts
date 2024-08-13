import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { AuctionLiveComponent } from './auction-live/auction-live.component';
import { AuctionBuyComponent } from './auction-buy/auction-buy.component';
import { VendorComponent } from './vendor/vendor.component';
import { CreatenewitemComponent } from './createnewitem/createnewitem.component';

const routes: Routes = [

  {
    path: 'auctionlive/:id', component: AuctionLiveComponent
  },
  {
    path: 'auctionbuy', component: AuctionBuyComponent
  },
  {
    path: 'vendor', component: VendorComponent
  },
  {
    path: 'createnewitem', component: CreatenewitemComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
