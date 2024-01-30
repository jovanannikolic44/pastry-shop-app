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

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'show-items', component: ShowItemsComponent},
  {path: 'show-promotions', component: ShowPromotionsComponent},
  {path: 'show-cakes', component: ShowCakesComponent},
  {path: 'item-details', component: ItemDetailsComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'show-basket', component: ShowBasketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
