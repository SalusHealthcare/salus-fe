import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HelpersModule } from '@salus/helpers';

@Component({
  selector: 'salus-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule, MatIconModule, RouterModule, HelpersModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
})
export class NavigationComponentModule {}
