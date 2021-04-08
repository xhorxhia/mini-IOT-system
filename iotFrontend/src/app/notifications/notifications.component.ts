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
  
  //addApplianceForm: FormGroup;
  // attributeForm: FormGroup;

   nestedForm: FormGroup;
   attributeList: FormArray;

  constructor(private fb: FormBuilder, private websocketAPI: WebSocketAPI) {
    this.webSocketAPI = websocketAPI;
  }

  ngOnInit() { // gjithe forma
    this.nestedForm = this.fb.group({
      type: [''], 
      location: [''],
      state: [''],   
      attribute: this.fb.array([this.addAttributeGroup()])
    });
  }
  
  addAttributeGroup() {  // gr i fushave qe do shtohen dinamikisht
    return this.fb.group({
      id:[''],
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

  addNewAttribute(){ // pushes a form control in the array every time is called(adds the fields dynamically)
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
  

}
