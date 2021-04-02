import { Component, OnInit, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Appliance } from '../appliance';
import { WebSocketAPI } from '../websocket/WebSocketAPI';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

@Injectable()
export class NotificationsComponent implements OnInit {
  webSocketAPI:WebSocketAPI;
  myappliance: Appliance;
  
  addApplianceForm: FormGroup;
   attributeForm: FormGroup;

   nestedForm: FormGroup;
   attributeList: FormArray;

  constructor(private fb: FormBuilder, private websocketAPI: WebSocketAPI) {
    this.webSocketAPI = websocketAPI;
  }

  ngOnInit() {
    this.nestedForm = this.fb.group({
      type: [''], 
      location: [''],
      state: [''],   
      attribute: this.fb.array([this.addAttributeGroup()])
    });
  }
  
  addAttributeGroup() {
    return this.fb.group({
      name: [''],
      min: [''],
      max: [''],
      value: [''],

    });
  }



  get type(){
    return this.nestedForm.get('type');
  }

  get location(){
    return this.nestedForm.get('location');
  }

  get state(){
    return this.nestedForm.get('state'); 
  }

  get attributesArray(){
    return this.nestedForm.get('attribute') as FormArray;
  }

  addNewAttribute(){ // pushes a form control in the array every time is called
    this.attributesArray.push(this.addAttributeGroup());
  }

// ben save appliance e re
  saveAppliance() {
    this.myappliance = this.nestedForm.value;
    console.log(this.myappliance, " newwww"); // !!!! duhet presje kur eshte obj
    this.webSocketAPI.onSendSave("/topic/add", this.myappliance);
    }

     
    connectToWebsocket() {
      this.webSocketAPI.getAllAppliances();
    }
  
    
  
  
   

//  showNotification(from, align){
//       const color = Math.floor((Math.random() * 5) + 1);

//       switch(color){
//         case 1:
//         this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
//            timeOut: 8000,
//            closeButton: true,
//            enableHtml: true,
//            toastClass: "alert alert-info alert-with-icon",
//            positionClass: 'toast-' + from + '-' +  align
//          });
//         break;
//         case 2:
//         this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
//            timeOut: 8000,
//            closeButton: true,
//            enableHtml: true,
//            toastClass: "alert alert-success alert-with-icon",
//            positionClass: 'toast-' + from + '-' +  align
//          });
//         break;
//         case 3:
//         this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
//            timeOut: 8000,
//            closeButton: true,
//            enableHtml: true,
//            toastClass: "alert alert-warning alert-with-icon",
//            positionClass: 'toast-' + from + '-' +  align
//          });
//         break;
//         case 4:
//         this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
//            timeOut: 8000,
//            enableHtml: true,
//            closeButton: true,
//            toastClass: "alert alert-danger alert-with-icon",
//            positionClass: 'toast-' + from + '-' +  align
//          });
//          break;
//          case 5:
//          this.toastr.show('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
//             timeOut: 8000,
//             closeButton: true,
//             enableHtml: true,
//             toastClass: "alert alert-primary alert-with-icon",
//             positionClass: 'toast-' + from + '-' +  align
//           });
//         break;
//         default:
//         break;
//       }
//   }
 

}
