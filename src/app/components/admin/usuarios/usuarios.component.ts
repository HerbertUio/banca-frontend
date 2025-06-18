import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Importar para los botones de navegación
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink], // Añadir RouterLink
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  isLoading = true;
  mensaje: string | null = null;

  constructor(private userService: UserService) {}

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
          this.cargarUsuarios(); // Recargar la lista para reflejar el cambio
        },
        error: (err) => {
          this.mensaje = 'Error al dar de baja al usuario.';
          console.error(err);
        }
      });
    }
  }
}
