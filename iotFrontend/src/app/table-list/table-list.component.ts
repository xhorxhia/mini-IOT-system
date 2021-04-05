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

  // merr nga websocket te gjitha appliances
  getAllFromWebsocket() {
    this.webSocketAPI.onSend("/topic/get");
    this.appliance = this.webSocketAPI.myappliance;
  }

  // funksioni per ndryshimin e gjendjes
  updateState(id: String) {
    this.webSocketAPI.onSend(`/topic/editState/${id}`);
    this.appliance = this.webSocketAPI.myappliance;
  }

  ngOnInit() {
    this.getAllFromWebsocket();
  }

}
