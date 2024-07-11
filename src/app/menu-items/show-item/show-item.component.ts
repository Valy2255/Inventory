import { Component, OnInit } from '@angular/core';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem } from '../../app-logic/inventory-item';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.css',
})
export class ShowItemComponent implements OnInit {
  item!: InventoryItem;
  itemId!: number;
  itemFound = false;

  constructor(
    private inventoryListMockService: InventoryListMockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parameters) => {
      if (parameters['id']) {
        this.itemId = parameters['id'];
      } else {
        this.itemId = 0;
      }
    });
  }
  ngOnInit(): void {
    this.inventoryListMockService.getItemId(this.itemId).subscribe((data) => {
      this.item = data;
    });
    this.itemFound = this.item ? true : false;
  }

  edit() {
    this.router.navigate(['edit/' + this.itemId]);
  }
}
