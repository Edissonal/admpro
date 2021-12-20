import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public imgSubs: Subscription;
  public cargando: boolean = true;
  public medicos: Medico[] = [];

  constructor(private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }
  
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  


  ngOnInit(): void {
    this.cargarMedicos();
    

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        console.log(img);
        this.cargarMedicos();
      });

  
  }
  




  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
        console.log(medicos);
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
    
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }
   
    this.busquedasService.buscar('medicos', termino)
      .subscribe(res => {
        this.medicos = res;
        console.log(res);
      })
  }

  borrarMedico(medico: Medico) {
    
    Swal.fire({
      title: 'Borrar Medico',
      text: `Esta a punto de borrar el usuario ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si Borrar?'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
          .subscribe(res => {
            this.cargarMedicos();
            Swal.fire(
            'Medico Borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success')});
      }
    });
    
  }

  }


