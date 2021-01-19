import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../usuarios.service'; //Importo el servicio de usuarios
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuariosService.getAll()  //metodo para recuperar el listado de todos
      .then(response => {
        this.usuarios = response.users;
        console.log(this.usuarios);
      })
      .catch(error => console.log(error));
  }

  //Metodo para borrar un usuario
  async borrarUsuario(pId) {
    console.log(pId);

    try {
      const response = await this.usuariosService.delete(pId)
      //Compruebo si se ha borrado el usuario y lo redirijo a la lista de usuarios
      console.log(response);

      if (response['description'] = "OK") {
        this.reloadPage(); //Recargamos la pagina para actualizar la lista
      }
    } catch (error) { //si hay error en el servidor devuelvo una alerta
      console.log(error.error.description);
      window.alert("Usuario no encontrado")
    }
  }

  // Funcion para recagar la pagina
  reloadPage() {
    window.location.reload();
  }


}
