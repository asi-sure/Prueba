import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private baseUrl = '/api';  //direccion de la endpoint API
//  private menus : Menus[];

  constructor(private http: HttpClient) {
//    this.menus = [];
   }
/*
  //metodo que extrae datos de la API
  getMenusLista(){
    return this.http.get(this.baseUrl+'/listamenu');
  }
*/
  getMeproLista(){
    return this.http.get(this.baseUrl+'/listamepro');
  }

  //OK
/*  
  getRolesLista(xuser: string): Observable<any> {
  }
*/    
//CAMBIA
  getRolesLista(xlogin: string, xtoken: string): Observable<any> {
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': xtoken
    });
    return this.http.get(this.baseUrl + '/listarolusu_login/' + xlogin , {headers: httpHeaders});
  }

  //OK
  getRolmeLista(){
    return this.http.get(this.baseUrl+'/listarolme',).pipe(
      catchError( (err) => {
        console.log("ocurrio un error BY:OAM");
        //console.warn(err);
        return throwError('Error personalizado');
      })
    );
  }

}
