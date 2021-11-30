import { AuthUserRoles } from './some';
import Keycloak from 'keycloak.js';

interface AuthAnyOfRole {
  anyOf: string[];
}

export type AuthRole = string | AuthAnyOfRole;
export const AUTH_ROLES: string = "AUTH_ROLES";

@Injectable({
  providedIn: "root"
})
export class AuthRoleService {
  userRoles: {[key: string]: true} = {};

  getUserRoles(): AuthUserRoles {
    return this.userRoles;
  }

  clearRoles(): void {
    this.userRoles = {};
  }

  setUserRoles(keycloak: Keycloak.KeycloakInstance): void {
    const { tokenParsed }: any = keycloak;
    const clientId: string = tokenParsed.azp
    const roles: string[] = (tokenParsed.access && tokenParsed.access[clientId] && tokenParsed.access[clientId].roles) || [];
    this.userRoles = roles.reduce((acc, role) => {
      return {
        ...acc,
        [role]: true
      };
    }, {})
  }

  hasRouteRoles(snapshot: ActiveRouteSnapshot): boolean {
    const requiredRoles: AuthRole[] = this.getRequiredRolesFromRouteData(snapshot);
    const missingRoles: string[] = this.getMissingRoles(snapshot);
    return missingRoles.length === 0;
  }

  hasRole(role: string): boolean {
    return Boolean(this.userRoles[role]);
  }

  getUserGroupRole(): GroupRole {
    if (this.hasRole(ROLES.RoleA)) return GROUP_ROLES.RoleA;
    return undefined;
  }

  private getRequiredRoleFromRouteData(shapshot: ActiveRouteSnapshot): AuthRole[] {
    const authRoles: AuthRole[] = snapshot.data[AUTH_ROLES];

    if(!authRoles) console.error("no auth roles for route");

    return authRoles || [];
  }

  private getMissingRoles(requiredRoles: AuthRole[]): string[] {
    const userRoles: AuthUserRoles = this.getUserRoles();

    return requiredRoles.reduce((acc, requireRole) => {
      if(typeof requireRole === "string") {
        const userHasRole: boolean = !!userRoles[requireRole];
        return userHasRole ? acc : [...acc, requireRole];
      }

      const { anyOf }: AuthAnyOfRole = requireRole as AuthAnyOfRole;
      const userHasAnyOfRequiredRole: boolean = anyOf.some(anyRole => userRoles[anyRole]);
      return 

    })
  }






}