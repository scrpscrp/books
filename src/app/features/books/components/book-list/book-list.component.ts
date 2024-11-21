import { Component, effect, EventEmitter, input, OnInit, Output } from '@angular/core';
import { Book } from '../../types/book.type';
import { MatTableModule} from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { filterByTitleOrAuthor } from '../../../../../shared/tools/search.filter'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule, MatPaginatorModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  @Output()
  public update = new EventEmitter<Book>()
  @Output()
  public delete = new EventEmitter<number>()
  @Output()
  public add = new EventEmitter()
  @Output()
  public details = new EventEmitter<Book>()

  constructor(){
    effect(() => this.filteredBooks = this.books())
  }

  public readonly books = input.required<Book[]>()
  
  public readonly displayedColumns = ['title','author','year','actions']
  public readonly labels = {
    add: '+ Add',
    edit:'edit',
    delete:'delete',
    search:'Search',
    searchByTitleOrAuthor:'Search by title or author'
  }
  
  public filteredBooks: Book[] = []
  public searchTerm: string = ''
  public pageSize: number = 10
  public currentPage: number = 0

  public onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex
    this.pageSize = event.pageSize
  }

  get currentPageBooks() {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredBooks.slice(startIndex, startIndex + this.pageSize);
  }

  public applyFilter(): void {
    this.filteredBooks = filterByTitleOrAuthor(this.books(),this.searchTerm)
    this.currentPage = 0; 
  }

  public editBook(book: Book):void {
  this.update.emit(book)
  }

  public deleteBook(id:number):void {
  this.delete.emit(id)
  }

  public addBook():void{
  this.add.emit()
  }

  public openDetails(book: Book):void {
  this.details.emit(book)
  }
}
