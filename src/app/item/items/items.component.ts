import { Component, OnInit } from '@angular/core';
import { COMPANYID, SERVICE } from 'src/constants';
import { Item } from 'src/models/item.model';
import { ItemService } from 'src/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService
  ) { }

  ngOnInit() {
    this.itemService.getItems(COMPANYID, SERVICE).subscribe(data => {
      this.items = data;
    })
  }

}
