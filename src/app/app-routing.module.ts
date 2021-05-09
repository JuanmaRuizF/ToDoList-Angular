import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'list', loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule) },
          { path: '', pathMatch:"full", redirectTo: 'list'},
          { path: 'new', loadChildren: () => import('./pages/new/new.module').then(m => m.NewModule) },
          { path: 'details', loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule) },
          { path: 'edit', loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditModule) },
          { path: 'historical', loadChildren: () => import('./pages/historical/historical.module').then(m => m.HistoricalModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
