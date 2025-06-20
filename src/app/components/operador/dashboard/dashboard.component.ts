import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-operador-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentDateTime: Date = new Date();
  private intervalId: any;

  constructor() { }

  ngOnInit(): void {
    // Actualizar la hora cada segundo
    this.intervalId = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo para evitar fugas de memoria al salir del componente
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
