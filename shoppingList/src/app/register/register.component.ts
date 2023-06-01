import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  ngOnInit() {}

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.http
      .post<any>('https://your-backend-url/register', userData)
      .subscribe(
        (response) => {
          // Stockage des informations dans le local storage
          localStorage.setItem('token', response.messages.user.token);
          localStorage.setItem('username', response.messages.user.username);

          // Redirection vers une autre page après l'inscription réussie
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
