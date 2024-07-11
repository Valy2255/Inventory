import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryItem } from '../../app-logic/inventory-item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  item!: InventoryItem;
  itemId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private inventoryListMockService: InventoryListMockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.addItemForm = formBuilder.group({});

    this.activatedRoute.params.subscribe((parameters) => {
      if (parameters['id']) {
        this.itemId = parameters['id'];
      } else {
        this.itemId = 0;
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.itemId = +params['id'] || 0;

      if (this.itemId !== 0) {
        this.inventoryListMockService
          .getItemId(this.itemId)
          .subscribe((item) => {
            this.item = item;
            this.initForm();
          });
      } else {
        this.item = new InventoryItem();
        this.initForm();
      }
    });
  }

  private initForm(): void {
    this.addItemForm = this.formBuilder.group({
      name: [this.item.name, Validators.required],
      description: [
        this.item.description,
        [Validators.required, Validators.maxLength(100)],
      ],
      user: [this.item.user, Validators.required],
      location: [this.item.location, Validators.required],
      inventoryNumber: [this.item.inventoryNumber, Validators.required],
      createdAt: [
        this.item.createdAt?.toString().split('T')[0],
        Validators.required,
      ],
    });
  }

  onSubmit() {
    if (!this.addItemForm.valid) {
      return;
    }

    const formValues = this.addItemForm.value;
    const item = new InventoryItem({
      ...formValues,
      createdAt: new Date(formValues.createdAt),
      modifiedAt: new Date(),
      deleted: false,
      id: this.itemId || undefined,
    });

    if (this.itemId === 0) {
      this.inventoryListMockService.addItem(item);
      this.router.navigate(['/inventory']);
    } else {
      this.inventoryListMockService.updateItem(item);
      this.router.navigate(['/inventory']);
    }
  }

  hasError(controlName: string, errorName: string) {
    return (
      this.addItemForm &&
      this.addItemForm.controls[controlName] &&
      this.addItemForm.controls[controlName].hasError(errorName)
    );
  }
  //
}
