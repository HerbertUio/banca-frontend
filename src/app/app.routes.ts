import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

// Importa los componentes standalone
import { DashboardComponent as ClienteDashboard } from './components/cliente/dashboard/dashboard.component';
import { CuentasComponent } from './components/cliente/cuentas/cuentas.component';
import { BeneficiariosComponent } from './components/cliente/beneficiarios/beneficiarios.component';
import { TransferirComponent } from './components/cliente/transferir/transferir.component';
import { DashboardComponent as OperadorDashboard } from './components/operador/dashboard/dashboard.component';
import { TransaccionesComponent } from './components/operador/transacciones/transacciones.component';
import { DashboardComponent as AdminDashboard } from './components/admin/dashboard/dashboard.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/admin/crear-usuario/crear-usuario.component';
import { CrearCuentaComponent } from './components/admin/crear-cuenta/crear-cuenta.component';
import { EditarUsuarioComponent } from './components/admin/editar-usuario/editar-usuario.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Cliente Routes
  { path: 'cliente/dashboard', component: ClienteDashboard, canActivate: [AuthGuard], data: { roles: ['CLIENTE'] } },
  { path: 'cliente/cuentas', component: CuentasComponent, canActivate: [AuthGuard], data: { roles: ['CLIENTE'] } },
  { path: 'cliente/beneficiarios', component: BeneficiariosComponent, canActivate: [AuthGuard], data: { roles: ['CLIENTE'] } },
  { path: 'cliente/transferir', component: TransferirComponent, canActivate: [AuthGuard], data: { roles: ['CLIENTE'] } },

  // Operador Routes
  { path: 'operador/dashboard', component: OperadorDashboard, canActivate: [AuthGuard], data: { roles: ['OPERADOR'] } },
  { path: 'operador/transacciones', component: TransaccionesComponent, canActivate: [AuthGuard], data: { roles: ['OPERADOR'] } },

  // Admin Routes
  { path: 'admin/dashboard', component: AdminDashboard, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/crear-usuario', component: CrearUsuarioComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/crear-cuenta', component: CrearCuentaComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },

  { path: '**', redirectTo: '/login' }
];
