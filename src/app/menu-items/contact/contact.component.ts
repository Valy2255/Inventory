import { Component } from '@angular/core';
import { ContactData } from '../../app-logic/contact-data';
import { ContactProviderService } from '../../app-logic/contact-provider.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactData: ContactData;

  constructor(private contactProvider: ContactProviderService) {
    this.contactData = contactProvider.getData();
  }
}
