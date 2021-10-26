import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.sass']
})
export class ServersComponent implements OnInit {
  allowAddNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName = "";

  constructor() {
    setTimeout(() => {
      this.allowAddNewServer = true;
    }, 3000);
   }

  ngOnInit(): void {
  }

  onServerCreation = () => {
    this.serverCreationStatus = 'Server was created';
  }

  onUpdateServerName(event:Event){
      this.serverName = (<HTMLInputElement>event.target).value;
  }
}
