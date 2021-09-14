import { Component, OnInit } from '@angular/core';
;

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getuarios().then(usuarios => {
      console.log(usuarios);
    });
    /*
    const promesa = new Promise((resolve,reject) => {
      


      if (false) {
        resolve('Hola mundo');
      } else {
        reject('algo salio mal');
      }

    });

    promesa.then((mesnaje) => {
      console.log(mesnaje);
    })
      .catch(error => console.log('Error en mi promesa', error));
*/
  //  console.log('fin del init');
  }


  getuarios() {

    return  new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body=> resolve(body.data));
    });

 

  }
}
