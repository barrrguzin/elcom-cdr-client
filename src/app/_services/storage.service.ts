import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private rolesKey: string = "Roles";

  constructor() { }

  setRoles(roles: String[] | null) {
    if (roles != null && roles.length > 0) {
      localStorage.setItem(this.rolesKey, roles.join(";"));
    }
  }

  getRoles(): String[] {
    const roles = localStorage.getItem(this.rolesKey);
    if (roles != null) {
      return roles.split(";");
    } else {
      return [];
    }
  }
}
