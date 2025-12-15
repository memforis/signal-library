import { Book } from '@library/models';

export function validateBorrow(borrowedBooks: Book[], book: Book): string | null {
  if (borrowedBooks.length >= 3) {
    return 'Jeden klient nie może wypożyczyć więcej niż 3 książki!';
  }

  if (borrowedBooks.some(b => b.id === book.id)) {
    return 'Ta książka została już wypożyczona przez tego klienta!';
  }

  return null;
}
