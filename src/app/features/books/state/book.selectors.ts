import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.reducer'

export const selectBookState = createFeatureSelector<BookState>('books');

export const selectAllBooks = createSelector(
  selectBookState,
  state => state.books
);

export const selectBooksLoading = createSelector(
  selectBookState,
  state => state.loading
);

export const selectBooksError = createSelector(
  selectBookState,
  state => state.error
);
