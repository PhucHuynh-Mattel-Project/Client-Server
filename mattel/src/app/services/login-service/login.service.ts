import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/operators';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private urllogin1: string;
  constructor(private http: HttpClient) {
 this.urllogin1 ="http://localhost:8080/login/"
}

public validateUserCredsWithEmail(email,password):Observable<any>{
  return this.http.get<any>(this.urllogin1+email +"/"+password);;
}
}
