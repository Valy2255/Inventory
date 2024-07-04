import { Injectable } from '@angular/core';
import { ContactData } from './contact-data';

@Injectable({
  providedIn: 'root',
})
export class ContactProviderService {
  providerData = <ContactData>{
    info: 'Unitate de stocare',
    address: 'Strada Turnului nr.5',
    openDays: 'Luni - Vineri',
    timeSlot: '9:00 - 17:00',
    phone: '0745 123 456',
  };

  constructor() {}

  getData(): ContactData {
    return this.providerData;
  }
}
