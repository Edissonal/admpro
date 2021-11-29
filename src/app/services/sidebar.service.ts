import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dasboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', Url: '/' },
        {titulo: 'ProgressBar', Url: 'progress'},
        {titulo: 'Graficas', Url: 'grafica1'},
        {titulo: 'promesas', Url: 'promesas'},
        {titulo: 'rxjs',Url:'rxjs'},
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', Url: 'usuarios' },
        { titulo: 'Hospitales', Url: 'hospitales' },
        {titulo: 'Medicos', Url: 'medicos'},
      ]
    }

  ];

  constructor() { }
}
