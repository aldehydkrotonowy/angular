@Injectable({
  providedIn: 'root'
})
export class PendingInterceptor implements HttpInterceptor {
  private activeRoutes: number = 0;

  constructor(
    private pendingStateService: PendingStateService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.activeRoutes++;
    this.pendingStateService.requestPending.next(true);

    return next.handle(req).pipe(
      filter((el) => {
        return el instanceof HttpResponse;
      }),
      finalize(() => {
        this.activeRoutes--;
        if(this.activeRoutes === 0 && !this.pendingStateService.isPooling) {
          this.pendingStateService.requestPending.next(false);
        }
      })
    )
  }


}