import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UsersService } from '../services/users/users.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _userService: UsersService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const error = err.error?.message || err.statusText;
            this._userService.getUsers()
            console.error(err);
            return throwError(error);
        }))
    }
}