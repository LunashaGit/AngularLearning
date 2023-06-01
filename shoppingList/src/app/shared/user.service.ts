import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new Subject<User>();
  httpOptions: object = {};
  // token: string | undefined =
  //   sessionStorage.getItem('token') || '' || undefined;
  login(data: User) {
    return this.http
      .post('api/login', {
        email: data.email,
        password: data.password,
      })
      .subscribe(
        (
          index:
            | {
                messages: {
                  user: {
                    id: number;
                    name: string;
                    email: string;
                    token: string;
                  };
                };
              }
            | any
        ) => {
          this.user.next(index.messages.user);
          // this.token = index.messages.user.token;
          sessionStorage.setItem('token', index.messages.user.token);
          this.router.navigate(['/']);
        }
      );
  }

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }),
    };
    if (sessionStorage.getItem('token') !== null) {
      this.http
        .post('api/me', {}, this.httpOptions)
        .subscribe((index: User) => {
          this.user.next(index);
        });
    }
  }

  logout() {
    return this.http.post('api/logout', {}, this.httpOptions).subscribe(() => {
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
