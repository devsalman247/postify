import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  routes = [
    {
      id: 1,
      path: '',
      name: 'Home',
    },
    {
      id: 2,
      path: 'register',
      name: 'Register',
    },
    {
      id: 3,
      path: 'login',
      name: 'Login',
    },
    {
      id: 4,
      path: 'about',
      name: 'About',
    },
  ];
}
