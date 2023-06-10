import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
const routes: Routes = [
 
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
      path: 'tableau_de_board',
      component: DashboardAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
