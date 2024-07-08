import { Component } from '@angular/core';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.css',
})
export class ScanComponent {
  constructor(private router: Router) {}

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    console.log('Qr Code Scanned ', e[0].value);
    if (action && action.stop()) {
      action.stop();
    }
    this.router.navigate(['item/' + e[0].value]);
  }
}
