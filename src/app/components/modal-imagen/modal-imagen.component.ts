import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  constructor(public ModalImagenService: ModalImagenService,
              public fileUploadService:FileUploadService) { }
  
  public imagenSubir: File;
  public imgTemp: any = null;


  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.ModalImagenService.cerrarModal();
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
    const id = this.ModalImagenService.id;
    const tipo = this.ModalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Imagen Actualizada', 'success');
        this.ModalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', err.error.msg , 'error');
      });
  }


}
