import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withState } from '@ngrx/signals';

import { Book } from '@library/models';
import { withBookEffects, withBookReducer } from '@library/stores';

export interface BookState {
  books: Book[];
  isLoading: boolean;
}

const initialBookState: BookState = {
  books: [],
  isLoading: false
};

export const BookStore = signalStore(
  { providedIn: 'root' },
  withState<BookState>(initialBookState),
  withDevtools('book'),
  withBookReducer(),
  withBookEffects()
);
