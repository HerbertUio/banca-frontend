import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AccountService } from '../../../services/account.service';
import { BeneficiaryService } from '../../../services/beneficiary.service';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transferir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.scss']
})
export class TransferirComponent implements OnInit {
  misCuentas: any[] = [];
  beneficiarios: any[] = [];

  transferencia = {
    sourceAccountNumber: '',
    targetAccountNumber: '',
    amount: null
  };

  isLoading = true;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private beneficiaryService: BeneficiaryService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.cargarDatosDelFormulario();
  }

  cargarDatosDelFormulario(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.isLoading = true;
      // Cargar cuentas propias
      this.accountService.getAccountsByUserId(currentUser.id).subscribe(cuentas => {
        this.misCuentas = cuentas;
      });

      // Cargar beneficiarios
      this.beneficiaryService.getBeneficiariesByUserId(currentUser.id).subscribe(beneficiarios => {
        this.beneficiarios = beneficiarios;
        this.isLoading = false;
      });
    }
  }

  realizarTransferencia(): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    if (!this.transferencia.sourceAccountNumber || !this.transferencia.targetAccountNumber || !this.transferencia.amount) {
      this.mensajeError = 'Todos los campos son obligatorios.';
      return;
    }
    if (this.transferencia.amount <= 0) {
      this.mensajeError = 'El monto debe ser un valor positivo.';
      return;
    }

    this.transactionService.transfer(this.transferencia).subscribe({
      next: (response) => {
        this.mensajeExito = `Transferencia por ${response.amount} realizada con éxito.`;
        // Resetear el formulario
        this.transferencia = {
          sourceAccountNumber: '',
          targetAccountNumber: '',
          amount: null
        };
        // Recargar datos para mostrar balances actualizados
        this.cargarDatosDelFormulario();
      },
      error: (err) => {
        this.mensajeError = err.error.message || 'Ocurrió un error al realizar la transferencia. Fondos insuficientes o datos incorrectos.';
        console.error(err);
      }
    });
  }
}
