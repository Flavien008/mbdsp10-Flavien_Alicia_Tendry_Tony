import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


//Route Module
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingComponent } from './setting/setting.component';
import { MyItemComponent } from './my-item/my-item.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    SettingComponent,
    MyItemComponent,
    MyCollectionComponent,
    FavoriteComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbTooltipModule
  ]
})
export class AccountModule { }
