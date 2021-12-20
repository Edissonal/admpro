import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospitales.models';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {


  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospital: Hospital;
  public hospitalSeleccionado: Hospital;
  public medicoseleccionado: Medico;


  constructor(private medicoService: MedicoService,
              private fb: FormBuilder,
              private hospitalService: HospitalService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarmedico(id);
      
    });
  

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital:['',Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
    .pipe(
      delay(100)
    )
      .subscribe(hospitalid => {
      
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalid);
        console.log(this.hospitalSeleccionado);
      });
  }


  cargarmedico(id: string) {

    if (id == 'nuevo') {
      return;
    }
    
    
    this.medicoService.obtenerMedicoPorId(id)
      .subscribe(medico => {
        console.log(medico);

        if (!medico) {
          return  this.router.navigateByUrl(`/dashboard/medicos`)
        }
        const { nombre, hospital: { _id } } = medico;
        console.log(nombre, _id);
        this.medicoseleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
    
    
    

}

  guardarMedico() {
        
      console.log(this.medicoseleccionado);
      const { nombre } = this.medicoForm.value;
  
  if (this.medicoseleccionado) {
    //actualizar
    const data = {
      ...this.medicoForm.value,
      _id: this.medicoseleccionado._id
    }
  
    this.medicoService.actualizarMedico(data)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire('Actualizado', `${nombre} Actualizado correctamente`, 'success');
      });
  
  } else { 

    console.log(this.medicoForm.value);
    const { nombre } = this.medicoForm.value;
    this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe((res:any) => {
      
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`)
      });
  }
    
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        console.log(hospitales);
        this.hospitales = hospitales;
      });
  }




}
