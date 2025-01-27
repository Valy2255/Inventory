import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service';
import { InventoryItem } from '../../app-logic/inventory-item';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  inventoryItems: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  inventoryColumns: string[] = [
    'select',
    'id',
    'name',
    'description',
    'user',
    'location',
    'inventoryNumber',
    'createdAt',
    'modifiedAt',
    'deleted',
    'action',
  ];

  selection = new SelectionModel<Element>(true, []);

  constructor(private inventoryListMockService: InventoryListMockService) {}

  ngOnInit(): void {
    this.inventoryListMockService.getData().subscribe((data) => {
      this.inventoryItems = new MatTableDataSource<InventoryItem>(data);
      this.inventoryItems.paginator = this.paginator;
      this.inventoryItems.sort = this.sort;
      console.log(this.inventoryItems);
    });
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.inventoryItems.data.forEach((row: Element) => {
          this.selection.select(row);
        });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows =
      this.inventoryItems && this.inventoryItems.data
        ? this.inventoryItems.data.length
        : 0;
    return numSelected === numRows;
  }

  delete(id: number) {
    this.inventoryListMockService.deleteItem(id);
    this.inventoryListMockService.getData().subscribe((data) => {
      this.inventoryItems = new MatTableDataSource<InventoryItem>(data);
      this.inventoryItems.paginator = this.paginator;
      this.inventoryItems.sort = this.sort;
    });
  }
}
