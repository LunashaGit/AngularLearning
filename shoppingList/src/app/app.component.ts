import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './shared/user.model';
import { UserService } from './shared/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'shoppingList';
  private auth!: Subscription;
  user!: User | undefined;
  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.userService.autoLogin();
    this.auth = this.userService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.userService.isAuth = true;
      }
    });
  }

  ngOnDestroy() {
    this.auth.unsubscribe();
  }
}
