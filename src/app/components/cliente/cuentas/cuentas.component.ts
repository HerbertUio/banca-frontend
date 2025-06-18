import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {
  cuentas: any[] = [];
  cuentaSeleccionada: any = null;
  transacciones: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.accountService.getAccountsByUserId(currentUser.id).subscribe({
        next: (data) => {
          this.cuentas = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'No se pudieron cargar las cuentas.';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  verTransacciones(cuenta: any): void {
    this.cuentaSeleccionada = cuenta;
    this.transacciones = [];

    this.accountService.getTransactions(cuenta.id).subscribe({
      next: (data) => {
        this.transacciones = data;
      },
      error: (err) => {
        console.error('Error al cargar las transacciones', err);

      }
    });
  }
}
