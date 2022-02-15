import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Personal } from './../model/personal2.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private baseUrl = '/api';

  constructor(
    private http: HttpClient
  ) { }
/*
  getPersonalLista(xestado: number): Observable<any[]>{
    return this.http.get<any>(this.baseUrl + '/listaper');
  }
*/

  getPersonalLista(xnombres:string, xtipoper:string, xestado: number): Observable<any[]>{
//  getPersonalLista(xestado: number): Observable<any[]>{
    const headers = new HttpHeaders().append('header', 'value');
    //const params = new HttpParams().append('estado', xestado);
    const params = new HttpParams()
      .set('nombres', xnombres)
      .set('tipoper', xtipoper)
      .set('estado', xestado);
    return this.http.get<any>(this.baseUrl + '/listaper', {headers, params});
  }
  /*
  const headers = new HttpHeaders().append('header', 'value');
  const params = new HttpParams().append('param', 'value');
  this.http.get('url', {headers, params}); 
*/
  savePersonal(per : Personal) : Observable<any> {  
    let url = this.baseUrl + "/addper";  
    return this.http.post(url, per);  
  }
  

}
