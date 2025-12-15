import { inject, Injectable } from '@angular/core';
import { Dispatcher } from '@ngrx/signals/events';

import { Book } from '@library/models';
import { bookEvents } from '@library/stores';

@Injectable({ providedIn: 'root' })
export class LibraryService {
  readonly #dispatcher = inject(Dispatcher);

  borrowBook(clientId: number, book: Book): void {
    this.#dispatcher.dispatch(bookEvents.borrowBook({ clientId, book }));
  }
}
