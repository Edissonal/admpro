import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { subscribeOn, delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedasServices: BusquedasService,
              private modalImagenService:ModalImagenService) { }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarusuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        console.log(img);
        this.cargarusuarios();
      });
  }

  cargarusuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
      
      this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
    });
  }

  cambiarpagina(valor: number) {
    
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarusuarios();
  }


  buscar(termino: string) {
    
    if (termino.length === 0) {
      return this.usuarios = [...this.usuariosTemp];
    }
    this.busquedasServices.buscar('usuarios', termino)
      .subscribe((res:Usuario[]) => {
           
        this.usuarios = res;
      });
  }

  eliminarusuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error','No puede Borrar ese usuario', 'error');
    }
    Swal.fire({
      title: 'Borrar Usuario',
      text: `Esta a punto de borrar el usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si Borrar?'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(res => {
            this.cargarusuarios();
            Swal.fire(
            'Usuario Borrado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success')});
      }
    });
  
  }

  cambiarRole(usuario: Usuario) {
    
    console.log(usuario);
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        console.log(resp);
        

      });
  }


  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
    
  }
}
