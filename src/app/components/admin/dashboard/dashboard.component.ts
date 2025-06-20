import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Propiedades para las estadísticas
  totalUsuarios = 0;
  totalCuentas = 0;
  isLoading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (usuarios) => {
        this.totalUsuarios = usuarios.length;
        // Usamos reduce para sumar la cantidad de cuentas de cada usuario
        this.totalCuentas = usuarios.reduce((sum: any, usuario: { accounts: string | any[]; }) => sum + usuario.accounts.length, 0);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar estadísticas", err);
        this.isLoading = false;
      }
    });
  }
}
