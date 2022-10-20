import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/Book.model';
import { BookService } from 'src/app/services/book.service';

declare let $: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() book: Book = new Book();

  errorMessage: String = '';

  constructor(private bookService: BookService) {}

  @Output() save = new EventEmitter<any>();
  saveBook() {
    this.bookService.saveBook(this.book).subscribe(
      (data) => {
        this.save.emit(data);
        $('#BookModal').modal('hide');
      },
      (err) => {
        this.errorMessage = ' Unexpected Error Ocurred';
        console.log(err);
      }
    );
  }

  showBookModal() {
    $('#BookModal').modal('show');
  }
}
