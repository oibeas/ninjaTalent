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

  //metodo para recuperar un usuario por su id
  getById(pId): Promise<any> {
    return this.httpClient.get<any>(this.baseUrl + "/" + pId).toPromise();
  }

  //metodo para crear un usuario
  create(formValues): Promise<any> {
    return this.httpClient.post(this.baseUrl, formValues).toPromise();
  }

  //metodo para borrar un usuario por su id  /:userId
  delete(idBorrar): Promise<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/" + idBorrar).toPromise();
  }


  //metodo para editar un usuario por su id /:userId
  edit(idEdit, formValues): Promise<any> {
    return this.httpClient.put(this.baseUrl + "/" + idEdit, formValues).toPromise();
  }




}
