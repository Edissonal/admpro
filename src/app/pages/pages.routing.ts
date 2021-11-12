import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [


  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
        {path: '', component: DasboardComponent,data:{titulo:'Dasboard'} },
        { path: 'progress', component: ProgressComponent ,data:{titulo:'Progress'}},
        { path: 'grafica1', component: Grafica1Component ,data:{titulo:'graficas'}},
        { path: 'acount-settings', component: AccountSettingsComponent,data:{titulo:'Ajustes de cuenta'} },
        { path: 'promesas', component: PromesasComponent,data:{titulo:'Promesas'} },
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'rxjs' } },
        { path: 'perfil', component: PerfilComponent,data:{titulo:'Perfil de usuario'} },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
