import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  allowNewServer: boolean = false;
  serverName: string = '';
  serverCreated: boolean = false;
  constructor() {
  }

  ngOnInit() {
  }

  getColor() {
    return this.allowNewServer === true && this.serverName !== "" ? 'green' : 'red';
  }

  onCreateServer() {
    this.serverCreated = true;
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
    this.serverName !== "" ? this.allowNewServer = true : this.allowNewServer = false;
  }

}
