import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'kanban', loadChildren: () => import('./modules/kanban/kanban.module').then(m => m.KanbanModule) }, { path: 'usermgmt', loadChildren: () => import('./modules/usermgmt/usermgmt.module').then(m => m.UsermgmtModule) }, { path: 'mytasks', loadChildren: () => import('./modules/mytasks/mytasks.module').then(m => m.MytasksModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
