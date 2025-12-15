import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { signalStoreFeature } from '@ngrx/signals';
import { Events, withEffects } from '@ngrx/signals/events';
import { catchError, map, of, switchMap } from 'rxjs';

import { Book } from '@library/models';
import { BooksApiService, ClientsApiService } from '@library/services';
import { bookApiEvents, bookEvents, ClientStore } from '@library/stores';
import { validateBorrow } from '@library/validators';

export function withBookEffects() {
  return signalStoreFeature(
    withEffects(
      (
        store,
        events = inject(Events),
        booksApiService = inject(BooksApiService),
        clientsApiService = inject(ClientsApiService),
        clientStore = inject(ClientStore)
      ) => ({
        loadBooks$: events.on(bookApiEvents.loadBooks).pipe(
          switchMap(() => booksApiService.getAll().pipe(
            map((books: Book[]) => bookApiEvents.loadBooksSuccess({ books })),
            catchError((err: HttpErrorResponse) => of(bookApiEvents.loadBooksFailure({ error: String(err.statusText) })))
          ))
        ),

        loadClientBooks$: events.on(bookApiEvents.loadClientBooks).pipe(
          switchMap(({ payload }) => clientsApiService.getBooks(payload.clientId).pipe(
            map((books: Book[]) => bookApiEvents.loadClientBooksSuccess({ clientId: payload.clientId, books })),
            catchError((err: HttpErrorResponse) => of(bookApiEvents.loadClientBooksFailure({ clientId: payload.clientId, error: String(err.statusText) })))
          ))
        ),

        borrowBook$: events.on(bookEvents.borrowBook).pipe(
          switchMap(({ payload }) => {
            const borrowedBooks = clientStore.borrowedBooks();
            const error = validateBorrow(borrowedBooks, payload.book);

            if (error) {
              return of(bookEvents.borrowBookFailure({ ...payload, error }));
            }

            return booksApiService.borrow(payload.clientId, payload.book).pipe(
              map(() => bookEvents.borrowBookSuccess({ clientId: payload.clientId, book: payload.book })),
              catchError((err: HttpErrorResponse) => of(bookEvents.borrowBookFailure({ clientId: payload.clientId, book: payload.book, error: String(err.statusText) })))
            )
          })
        )
      })
    )
  );
}
