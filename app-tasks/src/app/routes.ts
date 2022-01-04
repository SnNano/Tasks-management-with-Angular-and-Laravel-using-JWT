import { Routes } from "@angular/router";
import { NotFoundComponent } from "./cors/not-found/not-found.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { IndexComponent } from "./index/index.component";


export const appRoute: Routes = [
  { path: '' , children: [
    {path: '', component:IndexComponent},
    {path: 'home', component:IndexComponent}
  ]},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthenticationGuard]},
  {path: '**', component: NotFoundComponent}
]
