import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('@library').then(m => m.libraryRoutes) }
];
