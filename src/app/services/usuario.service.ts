import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.models';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

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

  get role(): 'ADMIN_ROLE' |'USER_ROLE'{
    return this.usuario.role;
  }
  
  get headers() {
   return {
    headers: {
      'x-token': this.token
    }
  }
  
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
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });

    });
  }

  GuardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu',JSON.stringify(menu));
   
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
        this.GuardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError(error => of(false))
    );
  }



  CrearUsuario(formData:RegisterForm) {
    
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap((res:any) => {
                    this.GuardarLocalStorage(res.token, res.menu);
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

  guardarUsuario(usuario:Usuario) {
    
    /*data = {
       ...data,
       role: this.usuario.role
     };*/
 
 
     return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
 
   }


  Login(formData:LoginForm) {  
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res:any) => {
          this.GuardarLocalStorage(res.token, res.menu);
                  }
                )
              )
  }

  LoginGoogle(token) {  
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((res:any) => {
          this.GuardarLocalStorage(res.token, res.menu);
                  }
                )
              )
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid));
            return {
              total: resp.total,
              usuarios
            };
        })

    )
    
  }

  eliminarUsuario(usuario:Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

}
