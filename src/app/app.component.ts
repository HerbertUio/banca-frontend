import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';

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

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
        if(this.authService.getUserRole() && event.url !== '/login') {
            this._isLoggedIn = true;
        } else {
            this._isLoggedIn = false;
        }
    });
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
