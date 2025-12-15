import { Component, input, output } from '@angular/core';

import { Book } from '@library/models';

@Component({
  selector: 'sl-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  readonly books = input<Book[]>([]);

  borrow = output<Book>();

  onBorrow(book: Book): void{
    this.borrow.emit(book);
  }
}
