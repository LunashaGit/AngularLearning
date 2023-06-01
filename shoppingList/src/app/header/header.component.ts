import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public userService: UserService, public http: HttpClient) {}

  ngOnInit() {}

  onLogout() {
    this.userService.user.next(undefined);
    this.userService.isAuth = false;
    this.userService.logout();
  }
}
