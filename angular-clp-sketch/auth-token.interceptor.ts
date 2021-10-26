@injectable();
export class AuthTokenInterceptor implements HttpInterceprot {
  constructor(private authService: AuthService);

  intercept(request: HttpResponse<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.shouldAuth(request.url) ? this.handleAuthorizedRequest(request, next) : next.handle(request);

    private handleAuthorizedRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.authService.getValidToken().pipe(
        switchMap((token) => {
          if(token) {
            return next.handle(request.clone({setHeaders: {Authorization: `Bearer ${token}`}}))
          } else {
            console.error("No token found");
            return next.handle(request);
          }
        })
      )
    }
  }
}