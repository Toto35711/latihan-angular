import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path:'departments',component:DepartmentListComponent},
  {path:'department-form',component:DepartmentFormComponent},
  {path:'department-form/:id',component:DepartmentFormComponent},
  {path:'home',component:HomeComponent},
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path: '**', pathMatch:'full',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
