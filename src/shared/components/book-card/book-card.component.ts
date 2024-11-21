import { Component, Inject } from '@angular/core';
import type { Book } from '../../../app/features/books/types/book.type'
import { DIALOG_DATA } from '../../dialog/dialog.token'
import { MatCardModule } from '@angular/material/card'
import { DialogRef } from '../../dialog/dialog.ref'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  constructor(@Inject(DIALOG_DATA)public readonly book: Book, private readonly _dialogRef:DialogRef){}

  public readonly headers = ['title','author','year','description']
  public readonly labels = {
    noImage:'NO IMAGE',
    close: 'Close',
    delete:'Delete'
  }

  public getBookProperty(header: string): string | number {
    const value = this.book[header as keyof Book];  
    return value !== undefined ? value : 'N/A'; 
  }

  public closeDelete(deleteBook?: boolean):void {
    this._dialogRef.close(deleteBook ? deleteBook : false)
  }

}
