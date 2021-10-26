import localsePl from '@angular/common/locales/pl'
import * as fromUser from 'src/store/users';
import * as fromCustomers from 'src/store/ustomers


regiserLocaleData(localePl);

const metaReducers: MetaReducer[] = environment.production ? [] : devMetaReducers;
const storeConfig: RootStoreConfig<any, any> = { metaReducers };
const reducers: ActionReducerMap<any, any> = {
  [fromUser.USER_FEATURE_KEYS]: fromUser.userReducer
}

const effects: Type<{}>[] = [
  fromCustomers.CustomerEffects
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // ...
    NxModule.forRoot(),
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, storeConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: 'pl-Pl'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {
        return () => authService.init();
      },
      deps: [AuthService EnvService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (envService: EnvService) => {
        return () => envService.init();
      },
      dep: [EnvService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (locationHistoryService: LocationHistoryService) => {
        return () => locationHistoryService.init();
      },
      deps: [LocationHistoryService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: pendingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorEnterceptor,
      multi: true
    }
  ]
})

export class AppModule {}