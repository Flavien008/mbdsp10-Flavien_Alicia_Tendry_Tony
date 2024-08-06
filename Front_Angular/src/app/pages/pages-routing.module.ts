import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
