import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuariosService: UsuarioService,
              private router:Router) {
             
  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
    return this.usuariosService.validarToken()
    .pipe(
      tap(estaAutenticado => {
         
        if (!estaAutenticado) {
          
          this.router.navigateByUrl('/login');
        }
      })
    );

  }
  
}
