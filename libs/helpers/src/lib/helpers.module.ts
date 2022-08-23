import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './role.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [RoleDirective],
  exports: [RoleDirective],
})
export class HelpersModule {}
