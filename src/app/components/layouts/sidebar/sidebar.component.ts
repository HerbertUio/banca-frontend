import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule]
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  role: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.role = this.authService.getUserRole();
  }
}
