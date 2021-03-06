import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/product.model';
import { Router } from '@angular/router';
import { Company } from 'src/models/company.model';
import { CompanyService } from './company.service';
import { Promotion } from 'src/models/promotion.model';
import { Order } from 'src/models/order.model';
import { DISCOUNT_APPLIES_TO } from 'src/constants';


@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private shopProductsBehaviorSubject: BehaviorSubject<Product[]>;
  public shopProductsObservable: Observable<Product[]>;

  private productListBehaviorSubject: BehaviorSubject<Product[]>;
  public productListObservable: Observable<Product[]>;


  private productBehaviorSubject: BehaviorSubject<Product>;
  public productObservable: Observable<Product>;
  url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private companyService: CompanyService,
  ) {
    this.productListBehaviorSubject = new BehaviorSubject<Product[]>([]);
    // this.productListBehaviorSubject = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('ProductsList')) || []);

    this.productBehaviorSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('currentProduct')) || null);
    this.productListObservable = this.productListBehaviorSubject.asObservable();
    this.productObservable = this.productBehaviorSubject.asObservable();

    this.shopProductsBehaviorSubject = new BehaviorSubject<Product[]>([]);
    this.shopProductsObservable = this.shopProductsBehaviorSubject.asObservable();


    this.url = environment.API_URL;
  }

  public get currentProductValue(): Product {
    return this.productBehaviorSubject.value;
  }
  public get getProductsListState(): Product[] {
    return this.productListBehaviorSubject.value;
  }
  public get getShopProductsState(): Product[] {
    return this.shopProductsBehaviorSubject.value;
  }

  updateProductListState(products: Product[]) {
    this.productListBehaviorSubject.next(products);
  }
  updateShopProductState(products: Product[]) {
    this.shopProductsBehaviorSubject.next(products);
  }
  updateProductState(product: Product) {
    this.productBehaviorSubject.next(product);
    localStorage.setItem('currentProduct', JSON.stringify(product));
  }

  add(product: Product) {
    return this.http.post<Product>(`${this.url}/api/product/add-product.php`, product);
  }
  update(product: Product) {
    return this.http.post<Product>(`${this.url}/api/product/update-product.php`, product);
  }
  updateRange(products: Product[]) {
    return this.http.post<Product[]>(`${this.url}/api/product/update-product-range.php`, products);
  }
  getProducts(companyId: string) {
    this.http.get<Product[]>(`${this.url}/api/product/get-products.php?CompanyId=${companyId}`).subscribe(data => {
      this.updateProductListState(data || []);
    });
  }
  getProductsSync(companyId: string) {
    return this.http.get<Product[]>(`${this.url}/api/product/get-products.php?CompanyId=${companyId}`);
  }




  getProduct(ProductId: string) {
    this.http.get<Product>(`${this.url}/api/product/get-product.php?ProductId=${ProductId}`).subscribe(data => {
      if (data) {
        this.updateProductState(data);
      }
    });
  }


  getProductSync(ProductId: string) {
    return this.http.get<Product>(`${this.url}/get-product.php?ProductId=${ProductId}`);
  }


  generateSlug(company: string, name: string, code: string): string {
    name = name.trim();
    company = '';
    let slug = name.toLocaleLowerCase().split(' ').join('-');
    slug = `${code.toLocaleLowerCase()}-${slug}`;
    slug = `${company.toLocaleLowerCase().split(' ').join('-')}-${slug}`;
    const slugArray = slug.split('');
    let newSlug = '';
    slugArray.forEach(item => {
      if (item.match(/[a-z]/i)) {
        newSlug += `${item}`
      }

      if (item.match(/[0-9]/i)) {
        newSlug += `${item}`
      }

      if (item === '-') {
        newSlug += `-`
      }
    })

    return newSlug;
  }


  adjustStockAfterSale(order: Order) {
    if (!order || !order.Orderproducts || !order.Orderproducts.length) {
      return;
    }
    const productsIds = order.Orderproducts.map(x => x.ProductId);
    this.getProductsRange(productsIds).subscribe(data => {
      if (data && data.length) {
        const productsToUpdate: Product[] = [];
        data.forEach(dbProduct => {
          const orderProduct = order.Orderproducts.find(x => x.ProductId === dbProduct.ProductId);
          if (orderProduct) {
            dbProduct.TotalStock = Number(dbProduct.TotalStock) - Number(orderProduct.Quantity);
            productsToUpdate.push(dbProduct);
          }
        });
        this.updateRange(productsToUpdate).subscribe(updated => {
          console.log(updated);
        });
      }
    });

  }


  getProductsRange(ids: string[]) {
    return this.http.post<Product[]>(
      `${this.url}/api/product/get-products-range.php`, ids
    );
  }
  // getAllActiveProductsSync(maxId:number) {
  //   return this.http.get<Product[]>(`${this.url}/api/product/get-all-active-products-for-shop.php?MaxId=${maxId}`);
  // }
  getAllActiveProductsASync(maxId: number) {
    this.http.get<Product[]>(`${this.url}/api/product/get-all-active-products-for-shop.php?MaxId=${maxId}`).subscribe(data => {

      if (data && data.length) {
        this.updateProductListState(data);
      }
    });
  }
  getAllActiveProductsForCompany(companyId: string, maxId: number) {
    this.http.get<Product[]>(
      `${this.url}/api/product/get-all-active-products-for-shop-for-company.php?CompanyId=${companyId}&&MaxId=${maxId}`).subscribe(data => {

        if (data && data.length) {
          this.updateShopProductState(data);
        }
      });
  }

  getAllActiveByCategoryId(categoryId: string, maxId: number) {
    return this.http.get<Product[]>(
      `${this.url}/api/product/get-all-active-products-by-category-id.php?CategoryGuid=${categoryId}&&MaxId=${maxId}`)

  }
  getAllActiveByParentCategoryId(categoryId: string, maxId: number) {
    return this.http.get<Product[]>(
      `${this.url}/api/product/get-all-active-products-by-parent0category-id.php?CategoryGuid=${categoryId}&&MaxId=${maxId}`)

  }


  getAllActiveProductsForCompanySync(companyId: string, maxId: number) {
    return this.http.get<Product[]>(
      `${this.url}/api/product/get-all-active-products-for-shop-for-company.php?CompanyId=${companyId}&&MaxId=${maxId}`)
  }

  applyPromotions(promotions: Promotion[], products: Product[]) {
    if (promotions && promotions.length) {

      const selectedPromo = promotions.find(x => x.AppliesTo === DISCOUNT_APPLIES_TO.SPECIFIC_PRODUCTS.Name && this.validateDate(x));
      if (!selectedPromo)
        return;


      const productIds = JSON.parse(selectedPromo.AppliesValue);
      if (!productIds)
        return;


      productIds.forEach(item => {
        const product = products.find(x => x.ProductId === item.trim());
        if (product) {
          product.SalePrice = Number(product.RegularPrice) - ((Number(product.RegularPrice)) * Number(selectedPromo.DiscountValue) / 100)
        }
      });

    }
  }

  applyPromotionOnSigleProduct(promotions: Promotion[], product: Product) {
    if (promotions && promotions.length) {

      const selectedPromo = promotions.find(x => x.AppliesTo === DISCOUNT_APPLIES_TO[1] && this.validateDate(x));
      if (!selectedPromo)
        return;


      const productIds = JSON.parse(selectedPromo.AppliesValue);
      if (!productIds)
        return;


      productIds.forEach(item => {
        if (product) {
          product.SalePrice = Number(product.RegularPrice) - ((Number(product.RegularPrice)) * Number(selectedPromo.DiscountValue) / 100)
        }
      });

    }
  }
  validateDate(promotion: Promotion) {
    var today = new Date();
    var startDate = new Date(promotion.StartDate);

    var diff = today.getTime() - startDate.getTime();
    return diff >= 0;
  }
}
