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

  register(form: NgForm): void {
    const userData = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };

    this.http
      .post<{
        messages: {
          user: {
            id: number;
            username: string;
            email: string;
            token: string;
          };
        };
      }>('api/register', userData)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
