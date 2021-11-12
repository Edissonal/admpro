import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuarios.models';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuitems: any[];
  public usuario : Usuario;

  constructor(private sidebarService: SidebarService,
              private usuarioService:UsuarioService) {
    this.menuitems = sidebarService.menu;
    this.usuario = usuarioService.usuario;

    console.log(this.menuitems);
  }

  ngOnInit(): void {
  }

}
