import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
              private fb: FormBuilder,
              private usuariosService: UsuarioService,
              private ngzone:NgZone) { }

  public formsubmiited = false;
  public auth2:any

  public LoginForm = this.fb.group({
    
    email: [localStorage.getItem('email') || '', [Validators.required,Validators.email]],
    password: ['', Validators.required],
    remember:[false]
    
    
  });


  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    //this.router.navigateByUrl('/');
    //console.log(this.LoginForm.value);
    this.usuariosService.Login(this.LoginForm.value)
      .subscribe(res => {
        if (this.LoginForm.get('remember').value) {
          localStorage.setItem('email', this.LoginForm.get('email').value);
        } else {
          
          localStorage.removeItem('email');
        }
        
            //navegar a ruta
        this.router.navigateByUrl('/');
        
      }, (err) => {
        // si susede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
     
     
     this.startApp();
   }
  
  async startApp() {
     
    await this.usuariosService.googleInit();
    this.auth2 = this.usuariosService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
   };
  
   attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) =>{
          const id_token = googleUser.getAuthResponse().id_token;
         // console.log(id_token);
          this.usuariosService.LoginGoogle(id_token)
            .subscribe(rep => {
                 //navegar a ruta
              this.ngzone.run(() => {
                this.router.navigateByUrl('/');
              });
              
            });
       
        }, (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
