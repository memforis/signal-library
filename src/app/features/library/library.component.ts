import { Component, inject } from '@angular/core';
import { Dispatcher } from '@ngrx/signals/events';

import { Book } from '@library/models';
import { BookListComponent, BorrowedListComponent, ClientSelectComponent, ErrorMessageComponent } from '@library/components';
import { LibraryService, MessageService } from '@library/services';
import { bookApiEvents, BookStore, clientApiEvents, clientEvents, ClientStore } from '@library/stores';

@Component({
  selector: 'sl-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  imports: [
    BookListComponent,
    BorrowedListComponent,
    ClientSelectComponent,
    ErrorMessageComponent
  ]
})
export class LibraryComponent {
  readonly bookStore = inject(BookStore);
  readonly clientStore = inject(ClientStore);

  readonly #dispatcher = inject(Dispatcher);
  readonly #messageService = inject(MessageService);
  readonly #libraryService = inject(LibraryService);

  constructor() {
    this.#dispatcher.dispatch(clientApiEvents.loadClients({}));
    this.#dispatcher.dispatch(bookApiEvents.loadBooks({}));
  }

  onClientSelect(clientId: number): void {
    this.#dispatcher.dispatch(clientEvents.selectClient({ id: clientId }));
  }

  onBookBorrow(book: Book): void {
    const clientId = this.clientStore.selectedClientId();

    if (!clientId) {
      return this.#messageService.show('Wybierz klienta przed wypożyczeniem!');
    }

    return this.#libraryService.borrowBook(clientId, book);
  }
}
