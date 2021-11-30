import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.productListObservable.subscribe(data => {
      if(data && data.length)
      this.products = data.filter(x=>x.FeaturedImageUrl && x.FeaturedImageUrl.length);
      else
      this.products =[];
    })
  }

}
