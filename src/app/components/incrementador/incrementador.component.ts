import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  constructor() { }

  @Input('valor') progreso: number = 50;
  @Input() btnclass: string = 'btn btn-primary';
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

 /* get getProcenteaje() {
    return `${this.progreso}%`;
  }
  */

  cambiarValor(valor: number) {
    this.progreso = this.progreso + valor;
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);

      return this.progreso = 100;
    }

    if(this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.valorSalida.emit(this.progreso);
    
  }


  ngOnInit(): void {

    this.btnclass = `btn ${this.btnclass}`;
  }

  onChange(nuevoValor: number) {
    
    // this.valorSalida.emit(valor);

    /*  if (nuevoValor >= 100) {
        this.progreso = 100;
      } else if (nuevoValor <= 0) {
        this.progreso = 0;
      } else {
        this.progreso = nuevoValor;
      }
      this.valorSalida.emit(this.progreso);
    }*/
  
    if (nuevoValor > 100) {
      nuevoValor = 100;
    } else if (nuevoValor < 0) {
      nuevoValor = 0;
    } else {
      this.valorSalida.emit(nuevoValor);
    }
    
  }
}
