import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospitales.models';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit ,OnDestroy{

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private HospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedasService:BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      console.log(img);
      this.cargarHospitales();
    });

  
  }

  cargarHospitales() {
    
    this.cargando = false;

    this.HospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.hospitales = hospitales;
        console.log(this.hospitales);
      });
  }

  guardarCambios(hospital:Hospital){

    this.HospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(res => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  EliminarHospital(hospital:Hospital){

    this.HospitalService.borrarHospital(hospital._id)
      .subscribe(res => {
        this.cargarHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success');
      });
  }
  

  async abrirSweetAlert() {
    const { value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });
    
    if ( value.trim().length > 0 ) {
      this.HospitalService.crearHospital(value)
        .subscribe((res: any) => {
          console.log(res)
          this.hospitales.push(res.Hospital);
         });
   }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
    
  }

  buscarH(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }
   
    this.busquedasService.buscar('hospitales', termino)
      .subscribe(res => {
        this.hospitales = res;
        console.log(res);
    })
  }

}
