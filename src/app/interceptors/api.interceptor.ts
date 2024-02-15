import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const handleError = (error: HttpErrorResponse) => {
  if (error.error instanceof ErrorEvent) {
    // Client-side or network error occurred
    console.error('An error occurred on client:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code
    console.error(
      `Backend returned code ${error.status}, ` + `body was: ${error.error}`
    );
  }

  // console.log('Error:', error);
  // Return an observable with a user-facing error message
  return throwError(
    () => new Error('Error while making api request to the server!')
  );
};

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:3000';
  const authToken = localStorage.getItem('token');

  const authRequest = req.clone({
    url: baseUrl + req.url,
    headers: authToken
      ? req.headers.set('Authorization', `Bearer ${authToken}`)
      : req.headers,
  });

  return next(authRequest).pipe(catchError(handleError));
};
