import { Injectable } from '@angular/core';
import { CommonService, UserRole } from '@salus/graphql';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private commonService: CommonService) {}

  hasRole(authorizedRoles: UserRole[]): Observable<boolean> {
    return this.commonService.getCurrentUser().valueChanges.pipe(
      map((response) => {
        if (response.data.currentUser) {
          const person = response.data.currentUser.person;
          const roles = person ? person.roles : [UserRole.ADMIN];
          if (roles.some((role) => authorizedRoles.includes(role))) {
            return true;
          } else {
            return false;
          }
        }
        return false;
      })
    );
  }
}
