import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CommonService } from '@salus/graphql';

@Directive({
  selector: '[salusRole]',
})
export class RoleDirective implements OnInit {
  @Input() activatedRoles!: string[];

  constructor(
    private elementRef: ElementRef,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.getCurrentUser().valueChanges.subscribe((response) => {
      if (response.data.currentUser) {
        const person = response.data.currentUser.person;
        const roles = person ? person.roles : ['ADMIN'];
        if (roles.some((role) => this.activatedRoles.includes(role))) {
          this.elementRef.nativeElement.style.display = 'block';
        } else {
          this.elementRef.nativeElement.style.display = 'none';
        }
      }
    });
  }
}
