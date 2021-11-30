import { Category } from './category.model';
import { Company } from './company.model';
import { Images } from './images.model';
import { Promotion } from './promotion.model';

export interface Product {
  Id?: number;
  ProductId: string;
  CompanyId: string;
  Name: string;
  OldPrice?: number;
  RegularPrice: number;
  SalePrice?: number;
  OnSale?: boolean;
  PriceFrom: number;
  PriceTo: number;
  Description: string;
  ProductSlug: string;
  CatergoryId: any;
  ParentCategoryId?: number;
  CategoryName: string;
  ParentCategoryName?: string;
  ParentCategoryGuid: string;
  CategoryGuid: string;
  TertiaryCategoryGuid: string;
  TertiaryCategoryName: string;
  ReturnPolicy: string;
  FeaturedImageUrl: string;
  IsJustInTime: string;
  ShowOnline: boolean;  // show || hide
  EstimatedDeliveryDays: number;
  ShowRemainingItems: number;
  OrderLimit: number;
  OtherOrderLimit?: number;
  TotalStock: number;
  SupplierId: string;
  ProductType: string;
  ProductStatus?: string;
  Code: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  Category?: Category;
  ParentCategory?: Category;
  TertiaryCategory?: Category;
  Company?: Company;
  ClassSelector?: string;

  SelectedQuantiy?: number;
  SelectedCoulor?: string;
  SelectedSize?: string;
  OtherEstimatedDeliveryDays?: number; // if (IsJustInTime) option is other
  Images?: Images[];
  AllImages?: Images[];
  IsSelected?: boolean;
  IsSelectedForGet?: boolean;
  HasBeenSelected?: boolean;
  PickId?: string;
  Promotions ?:Promotion[]


}
