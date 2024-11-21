import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, catchError, of } from "rxjs"
import { Book } from "../types/book.type"
import { environment as env } from "../../../../environments/environment"
import { books } from "../mocks/books.mock"
import { Store } from "@ngrx/store"

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private readonly _http: HttpClient, private readonly _store:Store) {}

  public getAll(): Observable<Book[]> {
    return this._http.get<Book[]>(env.apiUrl).pipe(catchError(() => of(books)));
  }

}
