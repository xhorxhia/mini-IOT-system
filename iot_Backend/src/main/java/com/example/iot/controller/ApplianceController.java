package com.example.iot.controller;

import com.example.iot.model.Appliance;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("")
    public String str(){
        return "Sukses";
    }


    @GetMapping("/showAll")
    public List<Appliance> getAppliances() {
        return service.getAll();
    }

    @PostMapping("/add")
    public Appliance addAppliance(@RequestBody Appliance appliance) {
        return service.insertToDb(appliance);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAppliance(@PathVariable String id) {
        service.delete(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        service.deleteAll();
    }

    @PutMapping("/editState/{id}")
    public List<Appliance> update(@PathVariable String id){
     return  service.updateState(id);
    }

    @PutMapping("/editAttr/{id}/{index}/{value}")
    public List<Appliance> updateAttribute(@PathVariable String id,@PathVariable int index,@PathVariable int value){
        return  service.updateMinMax(id, index, value);
    }




//    @PutMapping("/edit/{id}")
//    public List<Appliance> updateAppliance(@PathVariable int id, @RequestBody Appliance app) throws ResourceNotFoundException {
//        appliance = com.example.iot.repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appliance not found for this id :: " + id));
//
//        appliance.setState(app.getState());
//        appliance.setType(app.getType());
//        appliance.setLocation(app.getLocation());
//
//        final Appliance updatedAppliance = com.example.iot.repository.save(appliance);
//        return (List<Appliance>) updatedAppliance;
//
//    }
}
