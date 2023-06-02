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
  isAuth: boolean = false;
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
          sessionStorage.setItem('token', index.messages.user.token);
          this.router.navigate(['/']);
        }
      );
  }

  constructor(private http: HttpClient, private router: Router) {
    if (sessionStorage.getItem('token') !== null) {
      this.http
        .post('api/me', {}, this.httpOptions)
        .subscribe((index: User) => {
          this.user.next(index);
        });
    }
  }
  // sessionStorage
  logout() {
    return this.http.post('api/logout', {}, this.httpOptions).subscribe(() => {
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }

  register(data: User) {
    return this.http
      .post<{
        messages: {
          user: {
            id: number;
            username: string;
            email: string;
            token: string;
          };
        };
      }>('api/register', data)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
