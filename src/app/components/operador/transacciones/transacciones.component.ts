import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent {

  // Modelos para cada formulario
  deposito = {
    targetAccountNumber: '',
    amount: null
  };
  retiro = {
    sourceAccountNumber: '',
    amount: null
  };
  transferencia = {
    sourceAccountNumber: '',
    targetAccountNumber: '',
    amount: null
  };

  // Mensajes de feedback para cada operación
  mensajeDeposito: string | null = null;
  errorDeposito: string | null = null;
  mensajeRetiro: string | null = null;
  errorRetiro: string | null = null;
  mensajeTransferencia: string | null = null;
  errorTransferencia: string | null = null;

  constructor(private transactionService: TransactionService) {}

  realizarDeposito(): void {
    this.mensajeDeposito = null;
    this.errorDeposito = null;
    if (!this.deposito.targetAccountNumber || !this.deposito.amount) {
      this.errorDeposito = "Ambos campos son obligatorios.";
      return;
    }

    this.transactionService.deposit(this.deposito).subscribe({
      next: res => {
        this.mensajeDeposito = `Depósito de ${res.amount} realizado con éxito a la cuenta ${res.targetAccount.accountNumber}.`;
        this.deposito = { targetAccountNumber: '', amount: null };
      },
      error: err => {
        this.errorDeposito = err.error?.message || "Error al procesar el depósito.";
      }
    });
  }

  realizarRetiro(): void {
    this.mensajeRetiro = null;
    this.errorRetiro = null;
    if (!this.retiro.sourceAccountNumber || !this.retiro.amount) {
      this.errorRetiro = "Ambos campos son obligatorios.";
      return;
    }

    this.transactionService.withdrawal(this.retiro).subscribe({
      next: res => {
        this.mensajeRetiro = `Retiro de ${res.amount} realizado con éxito de la cuenta ${res.sourceAccount.accountNumber}.`;
        this.retiro = { sourceAccountNumber: '', amount: null };
      },
      error: err => {
        this.errorRetiro = err.error?.message || "Error al procesar el retiro.";
      }
    });
  }

  realizarTransferencia(): void {
    this.mensajeTransferencia = null;
    this.errorTransferencia = null;
    if (!this.transferencia.sourceAccountNumber || !this.transferencia.targetAccountNumber || !this.transferencia.amount) {
      this.errorTransferencia = "Todos los campos son obligatorios.";
      return;
    }

    this.transactionService.transfer(this.transferencia).subscribe({
      next: res => {
        this.mensajeTransferencia = `Transferencia de ${res.amount} realizada con éxito.`;
        this.transferencia = { sourceAccountNumber: '', targetAccountNumber: '', amount: null };
      },
      error: err => {
        this.errorTransferencia = err.error?.message || "Error al procesar la transferencia.";
      }
    });
  }
}
