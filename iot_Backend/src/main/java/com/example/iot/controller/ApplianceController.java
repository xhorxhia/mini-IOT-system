package com.example.iot.controller;

import com.example.iot.model.Appliance;
import com.example.iot.model.ApplianceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.*;
import com.example.iot.repository.ApplianceRepository;
import com.example.iot.service.ApplianceService;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("iot")
public class ApplianceController {

    @Autowired
    private ApplianceService service;
    private ApplianceRepository repository;

    @MessageMapping("/get")
    @SendTo("/topic/appliances/get")
    public List<Appliance> getAppliances() {

        return service.getAll();
    }

    @MessageMapping("/add")
    @SendTo("/topic/appliances/get")
    public List<Appliance> addAppliance(@Payload ApplianceDTO appliance) {
        return service.insertToDb(service.convertToAppliance(appliance));
    }

    @MessageMapping("/delete/{id}")
    @SendTo("/topic/appliances/get")
    public List<Appliance> deleteAppliance(@DestinationVariable String id) {

      return  service.delete(id);
    }

    @MessageMapping("/editState/{id}")
    @SendTo("/topic/appliances/get")
    public List<Appliance> update(@DestinationVariable String id) {  // update state
        return service.updateState(id);
    }

    @MessageMapping("/editAttr/{id}/{index}/{value}")
    @SendTo("/topic/appliances/get")
    public List<Appliance> updateAttribute(@DestinationVariable String id, @DestinationVariable int index, @DestinationVariable int value) {
        return service.updateValue(id, index, value);
    }

//    @MessageMapping("/deleteAll")
//    @SendTo("/topic/appliances/get")
//    public void deleteAll() {
//        service.deleteAll();
//    }

}
