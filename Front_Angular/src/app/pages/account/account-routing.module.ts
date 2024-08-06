import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { SettingComponent } from './setting/setting.component';
import { MyItemComponent } from './my-item/my-item.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path: 'setting', component: SettingComponent
  },
  {
    path: 'myitem', component: MyItemComponent
  },
  {
    path: 'mycollection', component: MyCollectionComponent
  },
  {
    path: 'favorite', component: FavoriteComponent
  },
  {
    path: 'notification', component: NotificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
