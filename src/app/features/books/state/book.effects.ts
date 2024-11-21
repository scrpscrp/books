import { Injectable } from "@angular/core"
import { mergeMap, map, catchError, of } from "rxjs"
import { BookService } from "../services/book.service"
import { loadBooks, loadBooksSuccess, loadBooksFailure } from "./book.actions"
import { Actions, createEffect, ofType } from "@ngrx/effects"


@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private bookService: BookService) {}

  public loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      mergeMap(() =>
        this.bookService.getAll().pipe(
          map(books => loadBooksSuccess({ books })),
          catchError(error => of(loadBooksFailure({ error })))
        )
      )
    )
  );
}
