import { signalStoreFeature, type } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';

import { bookApiEvents, BookState } from '@library/stores';

export function withBookReducer() {
  return signalStoreFeature(
    { state: type<BookState>() },
    withReducer(
      on(bookApiEvents.loadBooks, () => ({
        isLoading: true,
      })),

      on(bookApiEvents.loadBooksSuccess, ({ payload }) => ({
        books: payload.books,
        isLoading: false,
      })),

      on(bookApiEvents.loadBooksFailure, () => ({
        isLoading: false,
      }))
    )
  );
}
