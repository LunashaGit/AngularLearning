import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No server was created!';
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit() {

  }

  getColor() {
    return this.allowNewServer === true ? 'green' : 'red';
  }


  onCreateServer() {
    this.serverCreationStatus = 'Server was created!';
  }

}
