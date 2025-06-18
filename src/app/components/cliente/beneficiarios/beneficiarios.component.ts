import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { BeneficiaryService } from '../../../services/beneficiary.service';

@Component({
  selector: 'app-beneficiarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.scss']
})
export class BeneficiariosComponent implements OnInit {
  beneficiarios: any[] = [];
  isLoading = true;

  nuevoBeneficiario = {
    targetAccountNumber: ''
  };

  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private authService: AuthService,
    private beneficiaryService: BeneficiaryService
  ) {}

  ngOnInit(): void {
    this.cargarBeneficiarios();
  }

  cargarBeneficiarios(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.isLoading = true;
      this.beneficiaryService.getBeneficiariesByUserId(currentUser.id).subscribe({
        next: (data) => {
          this.beneficiarios = data;
          this.isLoading = false;
        },
        error: (err) => {
          if (err.status === 404) {
            this.beneficiarios = [];
          } else {
            this.mensajeError = 'No se pudieron cargar los beneficiarios.';
          }
          this.isLoading = false;
        }
      });
    }
  }

  agregarBeneficiario(): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    if (!this.nuevoBeneficiario.targetAccountNumber) {
      this.mensajeError = 'El número de cuenta es obligatorio.';
      return;
    }

    // --- NUEVA VALIDACIÓN: EVITAR DUPLICADOS ---
    const yaExiste = this.beneficiarios.some(b => b.account?.accountNumber === this.nuevoBeneficiario.targetAccountNumber && !b.deleted);
    if (yaExiste) {
      this.mensajeError = 'Este beneficiario ya ha sido agregado y está activo.';
      return;
    }
    // --- FIN DE LA NUEVA VALIDACIÓN ---

    const currentUser = this.authService.getCurrentUser();
    const request = {
      userId: currentUser.id,
      targetAccountNumber: this.nuevoBeneficiario.targetAccountNumber
    };

    this.beneficiaryService.addBeneficiary(request).subscribe({
      next: () => {
        this.mensajeExito = 'Beneficiario agregado correctamente.';
        this.nuevoBeneficiario.targetAccountNumber = '';
        this.cargarBeneficiarios();
      },
      error: (err) => {
        this.mensajeError = err.error?.message || 'Error al agregar el beneficiario. Verifique el número de cuenta.';
        console.error(err);
      }
    });
  }

  eliminarBeneficiario(id: number): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    if (confirm('¿Estás seguro de que deseas eliminar este beneficiario?')) {
      this.beneficiaryService.deleteBeneficiary(id).subscribe({
        next: () => {
          this.mensajeExito = 'Beneficiario eliminado correctamente.';

          // --- MEJORA DE UI: ACTUALIZAR ESTADO LOCALMENTE ---
          const beneficiarioEliminado = this.beneficiarios.find(b => b.id === id);
          if (beneficiarioEliminado) {
            beneficiarioEliminado.deleted = true;
          }
          // --- FIN DE LA MEJORA ---
        },
        error: (err) => {
          this.mensajeError = 'Error al eliminar el beneficiario.';
          console.error(err);
        }
      });
    }
  }
  reactivarBeneficiario(id: number): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    this.beneficiaryService.reactivateBeneficiary(id).subscribe({
      next: () => {
        this.mensajeExito = 'Beneficiario reactivado correctamente.';
        const beneficiarioReactivado = this.beneficiarios.find(b => b.id === id);
        if (beneficiarioReactivado) {
          beneficiarioReactivado.deleted = false;
        }
      },
      error: (err) => {
        this.mensajeError = 'Error al reactivar el beneficiario.';
        console.error(err);
      }
    });
  }
}
