import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{path: 'home', component:HomeComponent},
{path: 'login', component:LoginComponent},
{path: 'logout', component: LogoutComponent},
{path: 'user-dashboard', component: UserDashboardComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
