import { Component } from '@angular/core';
import { Store } from '@ngrx/store'
import { addBook, deleteBook, loadBooks, updateBook } from '../state/book.actions'
import { selectAllBooks, selectBooksLoading, selectBooksError } from '../state/book.selectors'
import { Book } from '../types/book.type'
import { AsyncPipe, CommonModule } from '@angular/common'
import { BookListComponent } from '../components/book-list/book-list.component'
import { take, tap } from 'rxjs'
import { DialogService } from '../../../../shared/dialog/dialog.service'
import { EditCreateBookComponent } from '../components/edit-create-book/edit-create-book.component'
import { BookCardComponent } from '../../../../shared/components/book-card/book-card.component'
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component'

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsyncPipe, CommonModule, BookListComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  public readonly headers: string[] = ['Title', 'Description', 'Author'];

  public books$ = this._store.select(selectAllBooks).pipe(tap( books => {
    this._books = books
  }))

  public loading$ = this._store.select(selectBooksLoading);

  public error$ = this._store.select(selectBooksError);

  private _books: Book[] = []

  constructor(private readonly _dialog: DialogService,private readonly _store: Store ){}

  public ngOnInit() {
    this._store.dispatch(loadBooks())
  }

  public update(updatedBook:Book):void {
    this._dialog.open(EditCreateBookComponent, { data : updatedBook}).afterClosed().pipe(take(1)).subscribe( book => 
      book && this._store.dispatch(updateBook({ book: book }))
    )
  }

  public deleteBook(id: number): void {
    this._dialog.open(ConfirmationDialogComponent, { data: 'Are you sure ?', panelClass: 'no-background-overlay-panel'}).afterClosed().pipe(take(1)).subscribe( confirm => 
      confirm && this._store.dispatch(deleteBook({ id })))
    
  }

  public add(): void {
    this._dialog.open(EditCreateBookComponent).afterClosed().pipe(take(1)).subscribe( newBook => newBook && this._createBook(newBook))
  }

  public openDetails(book: Book):void {
    this._dialog.open(BookCardComponent, { data: book, panelClass:'no-background-overlay-panel'}).afterClosed().pipe(take(1)).subscribe( bookToDelete => 
      bookToDelete && this.deleteBook(book.id))
  }

  private _createBook(newBook: Book):void {
    const book = newBook
    book.id = this._generateID()

    this._store.dispatch(addBook({ book: book }));
  }

  private _generateID():number {
    const randomId = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1
      this._books.forEach( book => {
        if (book.id === randomId) this._generateID()
      })

    return randomId
  }

}
