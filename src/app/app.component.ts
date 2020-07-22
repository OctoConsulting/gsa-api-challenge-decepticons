import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';

  constructor(private router: Router) {
    const path = localStorage.getItem('spapath');
    if (path) {
      localStorage.removeItem('spapath');
      this.router.navigate([path]);
    }
  }
}
