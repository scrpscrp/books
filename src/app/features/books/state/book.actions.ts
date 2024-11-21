import { createAction, props } from '@ngrx/store';
import { Book } from '../types/book.type'

export const loadBooks = createAction('[Book] Load Books');
export const loadBooksSuccess = createAction(
  '[Book] Load Books Success',
  props<{ books: Book[] }>()
);

export const loadBooksFailure = createAction(
  '[Book] Load Books Failure',
  props<{ error: unknown }>()
);

export const updateBook = createAction(
  '[Books] Update Book', 
  props<{ book: Book }>()
);


export const deleteBook = createAction(
  '[Books] Delete Book',
  props<{ id: number }>()
);

export const addBook = createAction(
  '[Books] Add Book',
  props<{ book: Book }>()
);