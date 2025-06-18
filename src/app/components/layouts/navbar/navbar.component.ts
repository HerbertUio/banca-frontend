import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() sidebarToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
