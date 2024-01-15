import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'kanban', loadChildren: () => import('./modules/kanban/kanban.module').then(m => m.KanbanModule) }, { path: 'usermgmt', loadChildren: () => import('./modules/usermgmt/usermgmt.module').then(m => m.UsermgmtModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
