import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar para los formularios
import { Router, RouterLink } from '@angular/router'; // Importar Router y RouterLink
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Añadir imports
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent {

  // Modelo para los datos del formulario, basado en el DTO del backend
  nuevoUsuario = {
    email: '',
    password: '',
    name: '',
    lastName: '',
    ci: '',
    mobile: null,
    address: ''
  };

  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router // Inyectar Router para la navegación
  ) {}

  crearUsuario(): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    // Validación simple (se puede mejorar si es necesario)
    if (Object.values(this.nuevoUsuario).some(v => v === '' || v === null)) {
      this.mensajeError = 'Todos los campos son obligatorios.';
      return;
    }

    this.userService.createUser(this.nuevoUsuario).subscribe({
      next: (response) => {
        this.mensajeExito = `Usuario ${response.email} creado con éxito. Redirigiendo a la lista...`;
        // Esperar un par de segundos para que el admin vea el mensaje y luego navegar
        setTimeout(() => {
          this.router.navigate(['/admin/usuarios']);
        }, 2000);
      },
      error: (err) => {
        this.mensajeError = err.error?.message || 'Ocurrió un error al crear el usuario.';
        console.error(err);
      }
    });
  }
}
