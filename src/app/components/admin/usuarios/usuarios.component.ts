import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Importar para los botones de navegación
import { UserService } from '../../../services/user.service';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  isLoading = true;
  mensaje: string | null = null;
  expandedUser: number | null = null;

  constructor(private userService: UserService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.isLoading = false;
      }
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas dar de baja a este usuario? Esta acción es reversible.')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.mensaje = 'Usuario dado de baja correctamente.';
          this.cargarUsuarios();
        },
        error: (err) => {
          this.mensaje = 'Error al dar de baja al usuario.';
          console.error(err);
        }
      });
    }
  }
  eliminarCuenta(cuentaId: number): void {
    if (confirm('¿Estás seguro de que deseas dar de baja esta cuenta? Su estado cambiará a "Cerrada".')) {
      this.accountService.deleteAccount(cuentaId).subscribe({
        next: () => {
          this.mensaje = 'Cuenta dada de baja correctamente.';
          this.cargarUsuarios();
        },
        error: (err) => {
          this.mensaje = 'Error al dar de baja la cuenta.';
          console.error(err);
        }
      });
    }
  }

  toggleExpand(userId: number): void {
    this.expandedUser = this.expandedUser === userId ? null : userId;
  }

}
