import { Component, OnInit } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/models/Book.model';
import { Purchase } from 'src/app/models/Purchase.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bookList: Array<Book> = [];
  faBook = faBook;
  errorMessage: String = '';
  infoMessage: String = '';

  constructor(
    private authenticationService: AuthenticationService,
    private bookService: BookService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.bookList = data;
    });
  }

  purchase(item: Book) {
    if (!this.authenticationService.currentUserValue?.id) {
      this.errorMessage = 'Log in first';
      return;
    }

    let purchaseItem = new Purchase(
      this.authenticationService.currentUserValue.id,
      item.id,
      item.price
    );

    this.purchaseService.savePurchase(purchaseItem).subscribe(
      (data) => {
        this.infoMessage = 'Item purchased';
      },
      (err) => {
        this.errorMessage = 'Unexpected Error occurred';
        console.log(err);
      }
    );
  }
}
