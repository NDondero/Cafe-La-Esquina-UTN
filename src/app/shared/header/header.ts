import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/productos');
  }
}
