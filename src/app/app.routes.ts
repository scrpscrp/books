import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page'),
  },
  {
    path: 'other',
    loadComponent: () => import('./pages/other/other.page'),
  },
]
