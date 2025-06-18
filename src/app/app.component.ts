import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'banca';
  sidebarOpen = false;
  private _isLoggedIn = false;

  constructor() {
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
