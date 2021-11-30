import { Component } from '@angular/core';
import { COMPANYID } from 'src/constants';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'online-shop';
  constructor(
    private p: ProductService
  ){
    p.getProducts(COMPANYID);
  }
}
