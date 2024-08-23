import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//scroll package
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

//component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MailfooterComponent } from './mailfooter/mailfooter.component';
import { AccountBreadcrumbsComponent } from './account-breadcrumbs/account-breadcrumbs.component';
import { AcountSidemenuComponent } from './acount-sidemenu/acount-sidemenu.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RelativeTimePipe } from '../pipes/relative-time.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    MailfooterComponent,
    AccountBreadcrumbsComponent,
    AcountSidemenuComponent,
    RelativeTimePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    SlickCarouselModule,
    ScrollToModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    MailfooterComponent,
    AccountBreadcrumbsComponent,
    AcountSidemenuComponent,
    RelativeTimePipe
  ]
})
export class SharedModule { }
