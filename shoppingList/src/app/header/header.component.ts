import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { UserService } from '../shared/user.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private auth!: Subscription;
  user!: User | undefined;
  isAuth: boolean = false;

  constructor(public userService: UserService, public http: HttpClient) {}

  ngOnInit() {
    this.auth = this.userService.user.subscribe((user) => {
      this.user = user;
      this.isAuth = true;
    });
  }

  ngOnDestroy() {
    this.auth.unsubscribe();
  }

  onLogout() {
    this.userService.user.next(undefined);
    this.userService.logout();
    this.user = undefined;
    this.isAuth = false;
  }
}
