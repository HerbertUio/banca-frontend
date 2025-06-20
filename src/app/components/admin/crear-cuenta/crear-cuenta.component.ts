import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent implements OnInit {
  usuarios: any[] = [];
  isLoading = true;

  // Modelo para el formulario
  nuevaCuenta = {
    userId: null,
    currency: '', // Bs o Dolares
    accountType: '', // Ahorros, Corriente
    initialBalance: 0.0
  };

  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private router: Router
  ) {}

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
        this.mensajeError = "Error al cargar la lista de usuarios.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  crearCuenta(): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    if (!this.nuevaCuenta.userId || !this.nuevaCuenta.currency || !this.nuevaCuenta.accountType) {
      this.mensajeError = "Debe seleccionar un usuario, tipo de moneda y tipo de cuenta.";
      return;
    }

    this.accountService.createAccount(this.nuevaCuenta).subscribe({
      next: (response) => {
        this.mensajeExito = `Cuenta N° ${response.accountNumber} creada exitosamente para el usuario seleccionado.`;
        // Limpiar formulario después del éxito
        this.nuevaCuenta = {
          userId: null,
          currency: '',
          accountType: '',
          initialBalance: 0.0
        };
      },
      error: (err) => {
        this.mensajeError = err.error?.message || "Ocurrió un error al crear la cuenta.";
        console.error(err);
      }
    });
  }
}
