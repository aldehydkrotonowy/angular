const AUTH_MIN_ROLE: AuthRole[] = [{anyOf: [Roles.RoleA, Roles.RoleB]}];

const clRoutes: Routes = [
  {
    path: ROUTES.loading.path,
    loadChildren: () => {
      import("/path/to/module").then(
        (module) => module.loadingModule
      )
    }
  },
  {
    path: ROUTES.start.path,
    canActivate: [AuthRoleGuard],
    data: {
      AUTH_ROLES: AUTH_MIN_ROLE
    },
    loadChildren: () => {
      import('path/to/module').then((module) => module.SomeModule)
    }
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(clRoutes, {preloadingStrategy: CustomPreloader})
  ],
  exports: [RouterModule],
  providers:[
    {
      provide: APP_BASE_HREF,
      useValue: "/"
    }
  ]
})

export class AppRouterModule {}