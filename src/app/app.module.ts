import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { ShowItemsComponent } from './components/show-items/show-items.component';
import { ShowPromotionsComponent } from './components/show-promotions/show-promotions.component';
import { ShowCakesComponent } from './components/show-cakes/show-cakes.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShowBasketComponent } from './components/show-basket/show-basket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ShowItemsComponent,
    ShowPromotionsComponent,
    ShowCakesComponent,
    ItemDetailsComponent,
    UserProfileComponent,
    ShowBasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
