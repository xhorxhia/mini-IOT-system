import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { _ } from 'ajv';
import { Appliance } from '../appliance';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Inject } from '@angular/core';
  


export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';  // endPoint created in spring consumer
    topic: string = "/topic/appliances/get";
    stompClient: any;

    applianceTopic: any = []
 
    appliance: any;

    dashboardComponent: DashboardComponent;

  constructor( private injecter: Inject){
      this.dashboardComponent = injecter.get(DashboardComponent);
  }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.getAllAppliances();
        }, 5000);
    }

    public ws: any;
    getAllAppliances() {
        console.log("Getting Appliances");
        this.ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(this.ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (message) {
                _this.onMessageReceived("message");
                //console.log("******:: "+ message);

            });
        }, this.errorCallBack);
    }

    /**
     * Send message to sever via web socket
     * @param {*} message 
     */
    // _send(message) {
    //     console.log("calling logout api via web socket");
    //     console.log("----",message);

    //     this.stompClient.send("/app/sendMessage", {}); //Json.Stringify(message)
    // }

    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 2500);
        });
    }

    onSend(destination: String) {
        this.getAllAppliances();
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, "Message sent!");
        });
    }

    onMessageReceived(message) {
       this.appliance = JSON.stringify(message);
        this.dashboardComponent.getObject(message);
        console.log(this.appliance);
       // this.dashboard.appliance = appliance;
        //DashboardComponent.appliance = [];
        // console.log(message);
    }

    getApplianceObject() {
        return this.appliance;
    }

}
