import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.models';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {


  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone:NgZone
  ) {
    
    this.googleInit();
     }
  
  get token():string {
    
    return  localStorage.getItem('token') || '';
  }

    
  get uid():string {
    
    return this.usuario.uid || '';
  }
  
  
  googleInit() {
    return new Promise<void>((resolve) => {
      console.log('google INIT promise');
      gapi.load('auth2', ()=>{
        this.auth2 = gapi.auth2.init({
          client_id: '881651428438-629rt66t7b6dtacipd669rp1pke7lpdd.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    
     })

    
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });

    });
  }

  validarToken():Observable<boolean> {
   // const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token':this.token
      }
    }).pipe(
      map((resp: any) => {
       // console.log(resp);
        const {
          email,
          google,
          nombre,
          role,
          img= '',
          uid,
        } = resp.usuario;

        this.usuario = new Usuario(nombre, email, null, img, google, role, uid);
        localStorage.setItem('token', resp.token)
        return true;
      }),
      catchError(error => of(false))
    );
  }



  CrearUsuario(formData:RegisterForm) {
    
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap((res:any) => {
                    localStorage.setItem('token',res.token)
                            }
                          )
                        )
  }


  ActualizarPerfil(data:{email:string,nombre:string,role:string}) {
    
    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    }
    );

  }


  Login(formData:LoginForm) {  
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res:any) => {
          localStorage.setItem('token',res.token)
                  }
                )
              )
  }

  LoginGoogle(token) {  
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((res:any) => {
          localStorage.setItem('token',res.token)
                  }
                )
              )
  }
}
