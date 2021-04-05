import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { _ } from 'ajv';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Appliance } from '../appliance';
  


export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';  // endPoint created in spring consumer
    topic: string = "/topic/appliances/get";
    stompClient: any;
    myappliance: any={};  // obj
    dashboardComponent: DashboardComponent;

public ws: any;

  // metoda connect qe ben lidhjen me serverin e websocket 
    getAllAppliances() {
        console.log("Getting Appliances");
        this.ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(this.ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (message) {
                _this.onMessageReceived(message);                
            });
        }, this.errorCallBack);
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

  
    /**
     * Send message to sever via web socket
     * @param {*} message 
     */


    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 2500);
        });
    }

    // con te dhenat ne server npm websocket
    onSend(destination: String) {
        this.getAllAppliances();
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, "Message sent!");
        });
    
    }

    // per save te appliances te re
    onSendSave(destination: String, app: Appliance) {  
        this.getAllAppliances();
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, JSON.stringify(app)); // converts to JSON string
        });
    }

    //therritet kur eshte marre nje msg nga serveri
    onMessageReceived(message) {
       this.myappliance.element = (JSON.parse(message.body));   // element eshte brenda obj myappliance qe mban listen appliance(dashboard)
      
    }


}
