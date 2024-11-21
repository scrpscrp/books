import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { BooksComponent } from "../../features/books/page/books.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, BooksComponent, BooksComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export default class HomePage {
  title = 'candidate'

  links = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ]
}
