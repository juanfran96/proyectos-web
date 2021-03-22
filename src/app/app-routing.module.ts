import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  {path:'inicio',component:InicioComponent},
  {path:'productos',component:ProductosComponent},
  {path:'agregar-producto',component:CreateComponent},
  {path:'producto/:id',component:DetalleComponent},
  {path:'editar-producto/:id',component:EditComponent},
  {path:'**',component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
