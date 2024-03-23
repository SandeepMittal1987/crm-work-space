import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';

const routes: Routes = [
  {
    path:'', redirectTo: 'login', pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
   {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'profile',
        component: EmpProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
