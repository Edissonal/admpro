import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AbstractControlOptions} from "@angular/forms";
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css' ]
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private usuarioservice: UsuarioService,
              private router:Router) { }
  public formsubmiited = false;

  public registerForm = this.fb.group({
    nombre: ['Edisson1', Validators.required],
    email: ['yuliam@gmail.com', [Validators.required,Validators.email]],
    password: ['1234567', Validators.required],
    password2: ['1234567', Validators.required],
    terminos: [ true, Validators.required],
    
  },{validators:this.passwordsIguales('password','password2')});
  




  ngOnInit(): void {
  }


  crearusuario() {
    console.log(this.registerForm.value);
    this.formsubmiited = true;

    if (this.registerForm.invalid) {
      return;
    }
    
    //realizar el posteo

    this.usuarioservice.CrearUsuario(this.registerForm.value)
      .subscribe(res => {
      
        console.log('Usuario creado');
        console.log(res);

           //navegar a ruta
           this.router.navigateByUrl('/');
      }, (err) => {
        // si susede un error

        Swal.fire('Error', err.error.msg, 'error');
      });

  }


  campoNovalido(campo: string):boolean {
    if (this.registerForm.get(campo).invalid && this.formsubmiited) {
      return true;

    }
    else {
      return false;
    }
    
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formsubmiited ) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos(){
   return !this.registerForm.get('terminos').value && this.formsubmiited
  }


  passwordsIguales(pass1Name: string, pass2Name: string) {
    
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
        
      }
    }
  }
}
