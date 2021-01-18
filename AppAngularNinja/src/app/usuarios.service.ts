import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://ninjatalent.herokuapp.com/users' //Esta es la ruta de nuetro back en heroku
    // this.baseUrl = 'http://localhost:3000/users' //Esta es la ruta de nuetro back en heroku
  }

  //metodo para recuperar todos los usuarios
  getAll(): Promise<any> {
    return this.httpClient.get<any>(this.baseUrl).toPromise();
  }

  create(formValues): Promise<any> {
    return this.httpClient.post(this.baseUrl, formValues).toPromise();
  }





}
