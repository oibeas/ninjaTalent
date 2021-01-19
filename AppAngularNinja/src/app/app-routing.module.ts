import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioComponent } from './usuarios/formulario/formulario.component';
import { ListaComponent } from './usuarios/lista/lista.component';
import { EditarComponent } from './usuarios/editar/editar.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/usuarios' }, //Ruta para redirigir sin texto
  { path: 'usuarios', component: ListaComponent }, //Ruta para listar los usuarios
  { path: 'usuarios/new', component: FormularioComponent },  //Ruta para insertar usuarios
  { path: 'usuarios/edit/:userId', component: EditarComponent },  //Ruta para insertar usuarios
  { path: '**', redirectTo: '/usuarios' } //ruta para redirigir cualquier otra que no exista
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
