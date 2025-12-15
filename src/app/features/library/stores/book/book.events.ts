import { type } from '@ngrx/signals';
import { event } from '@ngrx/signals/events';

import { Book } from '@library/models';

export interface LoadBooksPayload {}
export interface LoadBooksSuccessPayload { books: Book[] }
export interface LoadBooksFailurePayload { error: string }

export interface LoadClientBooksPayload { clientId: number }
export interface LoadClientBooksSuccessPayload { clientId: number; books: Book[] }
export interface LoadClientBooksFailurePayload { clientId: number; error: string }

export interface BorrowBookPayload { clientId: number; book: Book }
export interface BorrowBookSuccessPayload { clientId: number; book: Book }
export interface BorrowBookFailurePayload { clientId: number; book: Book; error: string }

export const loadBooks = event('[Books API] Load', type<LoadBooksPayload>());
export const loadBooksSuccess = event('[Books API] Load Success', type<LoadBooksSuccessPayload>());
export const loadBooksFailure = event('[Books API] Load Failure', type<LoadBooksFailurePayload>());

export const loadClientBooks = event('[Books API] Load Client Books', type<LoadClientBooksPayload>());
export const loadClientBooksSuccess = event('[Books API] Load Client Books Success', type<LoadClientBooksSuccessPayload>());
export const loadClientBooksFailure = event('[Books API] Load Client Books Failure', type<LoadClientBooksFailurePayload>());

export const borrowBook = event('[Books] Borrow', type<BorrowBookPayload>());
export const borrowBookSuccess = event('[Books] Borrow Success', type<BorrowBookSuccessPayload>());
export const borrowBookFailure = event('[Books] Borrow Failure', type<BorrowBookFailurePayload>());

export const bookApiEvents = {
  loadBooks,
  loadBooksSuccess,
  loadBooksFailure,
  loadClientBooks,
  loadClientBooksSuccess,
  loadClientBooksFailure
};

export const bookEvents = {
  borrowBook,
  borrowBookSuccess,
  borrowBookFailure
};
