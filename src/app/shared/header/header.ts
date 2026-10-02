import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service';
import { ROUTE_COMMANDS } from '../../app.route.segments';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly commands = ROUTE_COMMANDS;

  logout() {
    this.auth.logout();
    this.router.navigate(ROUTE_COMMANDS.products);
  }
}
