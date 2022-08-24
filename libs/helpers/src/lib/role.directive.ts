import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UserRole } from '@salus/graphql';
import { RoleService } from './role.service';

@Directive({
  selector: '[salusRole]',
})
export class RoleDirective implements OnInit {
  @Input() activatedRoles!: UserRole[];

  constructor(
    private elementRef: ElementRef,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roleService.hasRole(this.activatedRoles).subscribe((hasRole) => {
      if (hasRole) {
        this.elementRef.nativeElement.style.display = 'block';
      } else {
        this.elementRef.nativeElement.style.display = 'none';
      }
    });
  }
}
