import { WebSocketAPI } from './../websocket/WebSocketAPI';
import { Component, Injectable, OnInit } from '@angular/core';
import { Appliance } from '../appliance';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})


@Injectable()
export class TableListComponent implements OnInit {

  webSocketAPI: WebSocketAPI;
  appliance: Appliance[];

  constructor(private websocket: WebSocketAPI) {
    this.webSocketAPI = websocket;

  }

  connectToWebsocket() {
    this.webSocketAPI.getAllAppliances();
  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 1000);
    });
  }

  sendToWebsocket() {
    this.webSocketAPI.onSend("/topic/get");
    this.appliance = this.webSocketAPI.myappliance;
     console.log("helloooo  ", this.webSocketAPI.myappliance);

  }

  ngOnInit() {
    this.sendToWebsocket();
  }

}
