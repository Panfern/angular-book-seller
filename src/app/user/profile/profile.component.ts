import { Component, OnInit } from '@angular/core';
import { PurchaseItems } from 'src/app/models/PurchaseItems.model';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  puchasedItemsList: Array<PurchaseItems> = [];

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchaseService.getAllPurchaseItems().subscribe((data) => {
      this.puchasedItemsList = data;
    });
  }
}
