import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { InventoryComponent } from './menu-items/inventory/inventory.component';
import { ScanComponent } from './menu-items/scan/scan.component';
import { AddItemComponent } from './menu-items/add-item/add-item.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { ShowItemComponent } from './menu-items/show-item/show-item.component';

const routes: Routes = [
  { path: ``, component: HomePageComponent },
  { path: `inventory`, component: InventoryComponent },
  { path: `scan`, component: ScanComponent },
  { path: `add-item`, component: AddItemComponent },
  { path: 'edit/:id', component: AddItemComponent },
  { path: `contact`, component: ContactComponent },
  { path: `item/:id`, component: ShowItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const RoutingComponents = [
  HomePageComponent,
  InventoryComponent,
  ScanComponent,
  AddItemComponent,
  ContactComponent,
  ShowItemComponent,
];
