import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../usuarios.service'; //Importo el servicio de usuarios
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router'

import { debounceTime } from 'rxjs/operators'; //Esta libreria la importamos para que compruebe un campo despues de un tiempo determinado

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formulario: FormGroup;
  usuarios: any;
  ultimoId: any;
  formularioEnviar: any;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      firstname: new FormControl('', [
        Validators.required, //El campo debe rellenarse
        Validators.maxLength(20)//El campo no puede tener mas de 20 caracteres
      ]),
      lastname: new FormControl('', [
        Validators.required, //El campo debe rellenarse
        Validators.maxLength(50)//El campo no puede tener mas de 50 caracteres
      ]),
      email: new FormControl('', [
        Validators.required, //El campo debe rellenarse
        Validators.pattern(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/), //Es un validador por patrones
      ]),
      birthDate: new FormControl('', [
        Validators.required, //El campo debe rellenarse
      ]),
      street: new FormControl('', [
        Validators.required, //El campo debe rellenarse
        Validators.maxLength(50)//El campo no puede tener mas de 50 caracteres
      ]),
      city: new FormControl('', [
        Validators.required, //El campo debe rellenarse
        Validators.maxLength(20)//El campo no puede tener mas de 20 caracteres
      ]),
      country: new FormControl('', [
        Validators.required, //El campo debe rellenarse

      ]),
      postalcode: new FormControl('', [
        Validators.required, //El campo debe rellenarse
        Validators.pattern(/^([0-9]{1,5})$/), //El campo solo puede ser numerico entre 1 y 5 caracteres
      ])
    });

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
    const controlNombre = this.formulario.controls.firstname;
    controlNombre.valueChanges.pipe(debounceTime(700)).subscribe(value => { //retrasamos la comprobacion 700ms de la subscripcion, para que no esté comprobando constantemente al servidor.
      console.log(value);
    });
  }


  async onSubmit() {

    try {
      //Obtengo el ultimo id en la base de datos
      this.usuarios = await this.usuariosService.getAll();
      this.ultimoId = this.usuarios.users[this.usuarios.users.length - 1];
    } catch (error) {
      console.log(error);
    }

    //Inserto los valores del formulario mas el id recuperado +1
    this.formularioEnviar = {
      id: this.ultimoId.id + 1,
      firstname: this.formulario.value.firstname,
      lastname: this.formulario.value.lastname,
      email: this.formulario.value.email,
      birthDate: this.formulario.value.birthDate,
      address: {
        id: this.ultimoId.id + 1,
        street: this.formulario.value.street,
        city: this.formulario.value.city,
        country: this.formulario.value.country,
        postalcode: this.formulario.value.postalcode
      }
    };

    // console.log(this.formularioEnviar);


    try {
      //Guardo los datos en la base de datos
      const response = await this.usuariosService.create(this.formularioEnviar)
      //Compruebo si se ha creado el usuario y lo redirijo a la lista de usuarios
      if (response['description']) {
        this.router.navigate(['/usuarios']);
      }
    } catch (error) { //si hay error en el servidor devuelvo una alerta
      console.log(error.error.description);
      window.alert("Usuario no creado")
    }
  }



}
