import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ShowItemsComponent } from './components/show-items/show-items.component';
import { ShowPromotionsComponent } from './components/show-promotions/show-promotions.component';
import { ShowCakesComponent } from './components/show-cakes/show-cakes.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShowBasketComponent } from './components/show-basket/show-basket.component';
import { StaffRequestsComponent } from './components/staff-requests/staff-requests.component';
import { UserNotificationComponent } from './components/user-notification/user-notification.component';
import { AddNewItemComponent } from './components/add-new-item/add-new-item.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'show-items', component: ShowItemsComponent},
  {path: 'show-promotions', component: ShowPromotionsComponent},
  {path: 'show-cakes', component: ShowCakesComponent},
  {path: 'item-details', component: ItemDetailsComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'show-basket', component: ShowBasketComponent},
  {path: 'staff-requests', component: StaffRequestsComponent},
  {path: 'user-notification', component: UserNotificationComponent},
  {path: 'add-new-item', component: AddNewItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
