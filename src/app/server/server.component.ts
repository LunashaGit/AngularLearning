import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  allowNewServer: boolean = false;
  css: string = 'red';
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
      this.css = 'green';
    },2000);
  }

  ngOnInit() {
  }

}
