import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../usuarios.service'; //Importo el servicio de usuarios
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getAll()
      .then(response => {
        this.usuarios = response.users;
        console.log(this.usuarios);
      })
      .catch(error => console.log(error));
  }

  // async ngOnInit() {
  //   try {
  //     this.usuarios = await this.usuariosService.getAll();
  //     console.log(this.usuarios.users);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

}
