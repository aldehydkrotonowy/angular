export interface HttpErrorResponse {
  message: string;
  status: number;
  cancelGenericHandler(): void;
  responseTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceprot {
  private readonly _httpServerError: RegExp = new RegExp(/^(?:5)\d{2}$/);
  private readonly _clientApplicationError: RegExp = new RegExp(/^(?:4)\d{2}$/);
  private readonly _infoApplicationError: RegExp = new RegExp(/^(?:1)\d{2}$/);

  constructor(
    private _notificationService: SNotificationService, 
    private _dataPipe: DataPipe
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime: Moment = moment();
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const timeOut: number = setTimeout(() => {
          this._showErrorMessage(error);
        });

        const endTime: number = moment();
        const responseTime: number = endTime.diff(startTime, 'seconds');
        return throwError({
          message: this.getErrorMsg(error),
          status: this.getStatus(error),
          cancelGenericHandler: () => {
            clearTimeout(timeOut)
          },
          responseTime
        })
      })
    )
  }

private getErrorMsg(error: HttpErrorResponse): string {
  return error?.error.message ? error.error.message : error.message;
  // return error?.error?.message ?? error?.message
}

private getStatus(error: HttpErrorResponse): number {
  return error?.error?.statusCode || error?.status;
}

private _showErrorMessage(error: HttpErrorResponse): string {
  if (!error || !error.error | !error.error.status) return;

  const status: number = this.getStatus(error);
  const message: string = this.getErrorMsg(error);
  const date: string = this._getErrorDateTimestamp(error);

  if(this._httpServerError.test(status.toString())){
    this._notificationService.collapsedErrorMessage(`${date}: ${message}, Błąd serwera aplikacji - ${status}`);
  } else if (this._clientApplicationError.test(status.toString())) {
    this._notificationService.collapsedErrorMessage(`${date}: ${message}, Błąd aplikacji - ${status}`);
  } else if (this._infoApplicationError.test(status.toString())) {
    this._notificationService.collapsedErrorMessage(`${date}: ${message}, Informacje - ${status}`)
  }

}


private _getErrorDataTimestamp(error: HttpErrorResponse): string {
  const now: Date = new Date();
  return error && error.error && error.error.timestamp 
    ? this._dataPipe.transform(error.error.timestamp, 'yyyy-MM-dd HH:mm:ss')
    : this._dataPipe.transform(now, 'yyyy-MM-dd HH:mm:ss')
}





}