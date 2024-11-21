import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router'

import { routes } from './app.routes'
import { provideMaterialConfig } from './material.provider';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects'
import { BookEffects } from './features/books/state/book.effects'
import { bookReducer } from './features/books/state/book.reducer'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { MatCardModule } from '@angular/material/card'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideMaterialConfig(),
    provideHttpClient(withFetch()),
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({ onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always' })),
    provideStore({ books: bookReducer }),
    provideEffects([BookEffects]), provideAnimationsAsync(),
    provideMaterialModules()
],
}

function provideMaterialModules() {
  return {
    provide: MatCardModule
  };
}
