import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class LoginPageRoutingModule {}
