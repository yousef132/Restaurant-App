import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeComponent,FormsModule,CommonModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent {
  @Input() qrData:any;;
  ngOnInit() {
    this.generateOrderQRCode();
  }

  generateOrderQRCode() {
      const orderItems =this.qrData;
      console.log(orderItems);
      console.log("+++++++++++++++++");

      const formattedData = orderItems
        .map(
          (item: any, index: number) =>
            `${index+1}. ${item.item.name} (x${item.quantity}) - $${item.item.price * item.quantity}`
        )
        .join('\n');

      this.qrData = `Order Summary:\n${formattedData}`;
      console.log(this.qrData)

  }

}
