import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IPerson } from '@salus/graphql';

@Component({
  selector: 'salus-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  loggedUser: IPerson;

  constructor(private router: Router) {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/auth', 'login']);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderComponentModule {}
