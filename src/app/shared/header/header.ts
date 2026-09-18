import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {}
