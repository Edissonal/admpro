import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuarios.models';
import { Hospital } from '../../models/hospitales.models';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              private busquedasServices:BusquedasService) { }

  public usuarios: Usuario[] = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({termino}) => this.BusquedaGlobal(termino));
  }

  BusquedaGlobal(termino:string) {
    
    this.busquedasServices.busquedaGlobal(termino)
      .subscribe((res:any) => {
        console.log(res);
        this.usuarios = res.usuarios;
        this.medicos = res.medicos;
        this.hospitales = res.hospitales;
      
      });
  }

  abrirMedicos(medico: Medico) {
    
    
  }

}
