import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursCreateComponent } from './cours-create/cours-create.component';
import { CoursDetailComponent } from './cours-detail/cours-detail.component';
import { CoursListComponent } from './cours-list/cours-list.component';
import { CourGestionComponent } from './cour-gestion/cour-gestion.component';
const routes: Routes = [
 
  {
    path: 'create_cours',
    component: CoursCreateComponent
  },
  {
    path: 'cours_detail',
    component: CoursDetailComponent
  },
  {
    path: 'cours_list',
    component: CoursListComponent
  },
  {
    path: 'cours_gestion',
    component: CourGestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoursRoutingModule { }
