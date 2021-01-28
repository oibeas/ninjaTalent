import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../usuarios.service'; //Importo el servicio de usuarios
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {

  formulario: FormGroup;
  usuario: Usuario;
  usuarioId: any;
  formularioEnviar: any;


  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    this.formularioEnviar = {
      id: Number,
      firstname: String,
      lastname: String,
      email: String,
      birthDate: Date,
      address: {
        id: Number,
        street: String,
        city: String,
        country: String,
        postalcode: String
      }
    };


  }



  ngOnInit(): void {

    //Recogemos el numero de id y recuperamos sus datos por el id
    this.activatedRoute.params.subscribe(async params => {
      // console.log(params.userId);
      this.usuarioId = await this.usuariosService.getById(params.userId);
      // console.log(this.usuarioId);
      this.usuario = this.usuarioId.user
      // console.log(this.usuario);
      // console.log(this.usuario.firstname);
      // console.log(this.usuario.birthDate.toString().substr(0, 10));



      //Con los datos capturados, creamos el formulario
      this.formulario = new FormGroup({
        firstname: new FormControl(this.usuario.firstname, [
          Validators.required, //El campo debe rellenarse
          Validators.maxLength(20), //El campo no puede tener mas de 20 caracteres
          this.espaciosBlancos,  //Validador personalizado para ver si contiene espacios en blanco
        ]),
        lastname: new FormControl(this.usuario.lastname, [
          Validators.required, //El campo debe rellenarse
          Validators.maxLength(50), //El campo no puede tener mas de 50 caracteres
          this.espaciosBlancos,  //Validador personalizado para ver si contiene espacios en blanco
        ]),
        email: new FormControl(this.usuario.email, [
          Validators.required, //El campo debe rellenarse
          Validators.pattern(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/), //Es un validador por patrones
        ]),
        birthDate: new FormControl(this.usuario.birthDate.toString().substr(0, 10), [ //Cojo los 10 primeros caracteres de la fecha
          Validators.required, //El campo debe rellenarse
        ]),
        street: new FormControl(this.usuario.address.street, [
          Validators.required, //El campo debe rellenarse
          Validators.maxLength(50), //El campo no puede tener mas de 50 caracteres
          this.espaciosBlancos,  //Validador personalizado para ver si contiene espacios en blanco
        ]),
        city: new FormControl(this.usuario.address.city, [
          Validators.required, //El campo debe rellenarse
          Validators.maxLength(20), //El campo no puede tener mas de 20 caracteres
          this.espaciosBlancos,  //Validador personalizado para ver si contiene espacios en blanco
        ]),
        country: new FormControl(this.usuario.address.country, [
          Validators.required, //El campo debe rellenarse

        ]),
        postalcode: new FormControl(this.usuario.address.postalcode, [
          Validators.required, //El campo debe rellenarse
          Validators.pattern(/^([0-9]{1,5})$/), //El campo solo puede ser numerico entre 1 y 5 caracteres
        ])
      });
    });

  }





  //Funcion para guardar el formulario
  async onSubmit() {

    //Inserto los valores del formulario con el formato valido
    this.formularioEnviar = {
      id: this.usuario.id,
      firstname: this.formulario.value.firstname.trim(),
      lastname: this.formulario.value.lastname.trim(),
      email: this.formulario.value.email.replace(/\s+/g, ''),
      birthDate: this.formulario.value.birthDate,
      address: {
        id: this.usuario.id,
        street: this.formulario.value.street.trim(),
        city: this.formulario.value.city.trim(),
        country: this.formulario.value.country,
        postalcode: this.formulario.value.postalcode
      }
    };

    // console.log(this.formularioEnviar);

    try {
      //Guardo los datos en la base de datos
      const response = await this.usuariosService.edit(this.usuario.id, this.formularioEnviar)
      //Compruebo si se ha creado el usuario y lo redirijo a la lista de usuarios
      if (response['description']) {
        this.router.navigate(['/usuarios']);
      }
    } catch (error) { //si hay error en el servidor devuelvo una alerta
      console.log(error.error.description);
      window.alert("Usuario no modificado")
    }
  }



  // Validador de espacios en blacno
  espaciosBlancos(control) {
    if (control.value.trim().length == 0) {
      return { espaciosBlancos: true }
    } else {
      return null;
    }
  }

}
