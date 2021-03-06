import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuarios.models';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {


  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuariosService: UsuarioService,
              private fileUploadService:FileUploadService) {
              this.usuario = usuariosService.usuario;
               }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
          
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required,Validators.email]],
    });
  }


  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuariosService.ActualizarPerfil(this.perfilForm.value)
      .subscribe(res => {
      
        console.log(res);

        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios en el Guardado', 'success');

      }, (err) => {
        Swal.fire('Error', err.error.msg , 'error');
      //  console.log(err.error.msg); 
      });
  }

  cambiarImagen(file:File) {
    
    this.imagenSubir = file;
    if (!file) { return this.imgTemp = null;}
    
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen Actualizada', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', err.error.msg , 'error');
      });
  }

}
