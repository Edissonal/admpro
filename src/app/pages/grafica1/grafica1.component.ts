import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }

  ventas: string ;

  public labels1: string[] = ['chuis', 'rechuis', 'recontrachuis'];
  public data1 = [
    [700, 150, 20],
  ];



}
