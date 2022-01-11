import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';

// Componentes
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  { path: '', component: ListarUsuariosComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'editar-usuario/:id', component: CrearUsuarioComponent },
  { path: '**' , redirectTo: '' , pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
