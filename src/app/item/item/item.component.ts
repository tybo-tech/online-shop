import { Component, OnInit } from '@angular/core';
import { COMPANYID, SERVICE } from 'src/constants';
import { Item } from 'src/models/item.model';
import { ItemService } from 'src/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  item: Item;
  message: string;
  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.item = {
      ItemId: '',
      RelatedId: '',
      RelatedParentId: '',
      Name: '',
      ParentId: '',
      ItemType: SERVICE,
      CompanyId: COMPANYID,
      Description: '',
      OrderingNo: 1,
      Price: 0,
      ItemStatus: '',
      ItemCode: '',
      ImageUrl: '',
      ItemPin: '',
      ItemCategory: SERVICE,
      ItemSubCategory: '',
      CreateUserId: '',
      ModifyUserId: '',
      StatusId: 1
    }

  }
  save() {
    if (this.item.CreateDate) {
      this.itemService.update(this.item).subscribe(data => {
        if (data && data.ItemId) {
          this.message = 'Item updated successfully.';

        }
      })
    } else {
      this.itemService.add(this.item).subscribe(data => {
        if (data && data.ItemId) {
          // this.view(data);
          this.message = 'Item created successfully.';
        }
      })
    }

  }

  onImageChangedEvent(url) {
    if (this.item) {
      this.item.ImageUrl = url;
    }
  }
}
