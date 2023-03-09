import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { EditarClienteComponent } from './components/Clientes/editar-cliente/editar-cliente.component';
import { NuevoClienteComponent } from './components/Clientes/nuevo-cliente/nuevo-cliente.component';
import { VerClienteComponent } from './components/Clientes/ver-cliente/ver-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { EditarProductoComponent } from './components/Productos/editar-producto/editar-producto.component';
import { NuevoProductoComponent } from './components/Productos/nuevo-producto/nuevo-producto.component';
import { VerProductoComponent } from './components/Productos/ver-producto/ver-producto.component';
import { DetalleProveedorComponent } from './components/Proveedores/detalle-proveedor/detalle-proveedor.component';
import { EditarProveedorComponent } from './components/Proveedores/editar-proveedor/editar-proveedor.component';
import { NuevoProveedorComponent } from './components/Proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { VerProveedoresComponent } from './components/Proveedores/ver-proveedores/ver-proveedores.component';
import { ClientesGuard } from './guards/clientes.guard';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  //Cliente (no se usa en proyecto de torres)
  {path:'cliente/lista',component:VerClienteComponent, canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin','user','instructor','mantenimiento']}},
  {path:'cliente/nuevo',component:NuevoClienteComponent,canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin']}},
  {path:'cliente/editar/:id',component:EditarClienteComponent, canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin']}},
  //proveedor
  {path:'proveedor/lista',component:VerProveedoresComponent, canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin','user','instructor','mantenimiento']}},
  {path:'proveedor/lista/:id',component:DetalleProveedorComponent, canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin','user','instructor','mantenimiento']}},
  {path:'proveedor/lista/:id/:nombreProvedor',component:DetalleProveedorComponent, canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin','user','instructor','mantenimiento']}},
  {path:'proveedor/nuevo',component:NuevoProveedorComponent,canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin']}},
  {path:'proveedor/editar/:id',component:EditarProveedorComponent, canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin']}},
  //Producto
  {path:'producto/lista',component:VerProductoComponent, canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin','user','instructor','mantenimiento']}},
  {path:'poducto/lista/:nombreProvedor',component:VerProductoComponent, canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin','user','instructor','mantenimiento']}},
  {path:'producto/nuevo',component:NuevoProductoComponent,canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin']}},
  {path:'producto/editar/:id',component:EditarProductoComponent, canActivate:[ClientesGuard,HomeGuard], data:{expectedRoles:['admin']}},

  {path:'login',component:LoginComponent, canActivate:[LoginGuard]},
  {path:'register',component:RegisterComponent, canActivate:[ClientesGuard], data:{expectedRoles:['admin']}},
  {path:'**',redirectTo: 'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
