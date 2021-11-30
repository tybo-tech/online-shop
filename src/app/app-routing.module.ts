import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { ItemComponent } from './item/item/item.component';
import { ItemsComponent } from './item/items/items.component';
import { FeaturesComponent } from './layout/features/features.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeSliderComponent } from './layout/home-slider/home-slider.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SecondaryNavBarComponent } from './layout/secondary-nav-bar/secondary-nav-bar.component';
import { CartComponent } from './shopping/cart/cart.component';
import { ProductComponent } from './shopping/product/product.component';
import { ProductsComponent } from './shopping/products/products.component';


const routes: Routes = [
  {path:'items', component: ItemsComponent},
  {path:'products', component: ProductsComponent}
];
export const declarations = [
  NavBarComponent,
  SecondaryNavBarComponent,
  ItemComponent,
  ItemsComponent,
  ImageWidgetComponent,
  LoginComponent,
  HomeSliderComponent,
  FooterComponent,
  FeaturesComponent,
  CartComponent,
  ProductComponent,
  ProductsComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
