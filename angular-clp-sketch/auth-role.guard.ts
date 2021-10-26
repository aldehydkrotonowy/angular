@injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authRoleService: AuthRoleService,
    private authRoleGuardService: AuthRoleGuardService
  ){}

  canActivate(snapshot: ActivateRouteSnapshot): boolean {
    const canActivate: boolean = this.authRoleService.hasRouteRoles(snapshot);
    if(!canActivate){
      this.authRoleGuardService.increaseFailCount();
      this.router.navigateByUrl(new CRoutes().unautorized().bild().url);
    }

    return canActivate;
  }
}