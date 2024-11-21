import { createReducer, on } from '@ngrx/store';
import { loadBooks, loadBooksSuccess, loadBooksFailure, updateBook, deleteBook, addBook } from './book.actions'
import { Book } from '../types/book.type'


export interface BookState {
  books: Book[];
  loading: boolean;
  error: unknown;
}

export const initialState: BookState = {
  books: [],
  loading: false,
  error: null
};

export const bookReducer = createReducer(
  initialState,
  on(loadBooks, state => ({ ...state, loading: true })),
  on(loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    loading: false
  })),
  on(loadBooksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(updateBook, (state, { book }) => ({
    ...state,
    books: state.books.map((b) => 
      b.id === book.id ? { ...b, ...book } : b 
    ),
    loading: false
  })),

  on(deleteBook, (state, { id }) => ({
    ...state,
    books: state.books.filter((book) => book.id !== id)
  })),

  on(addBook, (state, { book }) => ({
    ...state,
    books: [...state.books, book]
  }))
);
