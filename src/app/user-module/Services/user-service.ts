import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users'; 
  constructor(private http: HttpClient) {}
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }
  loginUser(userData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`,userData);
  }
}
