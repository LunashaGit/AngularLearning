import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  register(form: NgForm): void {
    const userData = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };

    this.userService.register(userData);
  }
}
