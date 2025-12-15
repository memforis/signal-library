import { Book } from './book.model';

export interface Client {
  id: number;
  name: string;
  books: Book[];
}
