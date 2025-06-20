import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  usuario: any = null;
  profileData = {
    name: '',
    lastName: '',
    mobile: 0,
    address: '',
    status: ''
  };

  userId: number | null = null;
  isLoading = true;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.cargarDatosUsuario(this.userId);
    }
  }

  cargarDatosUsuario(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.usuario = data;
        if (data.profile) {
          this.profileData = {
            name: data.profile.name,
            lastName: data.profile.lastName,
            mobile: data.profile.mobile,
            address: data.profile.address,
            status: data.profile.status
          };
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.mensajeError = "No se pudo cargar la información del usuario.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  actualizarUsuario(): void {
    if (!this.userId) return;

    this.mensajeExito = null;
    this.mensajeError = null;

    this.userService.updateUserProfile(this.userId, this.profileData).subscribe({
      next: () => {
        this.mensajeExito = "Perfil del usuario actualizado correctamente. Redirigiendo...";
        setTimeout(() => {
          this.router.navigate(['/admin/usuarios']);
        }, 2000);
      },
      error: (err) => {
        this.mensajeError = err.error?.message || "Ocurrió un error al actualizar el perfil.";
        console.error(err);
      }
    });
  }
}
