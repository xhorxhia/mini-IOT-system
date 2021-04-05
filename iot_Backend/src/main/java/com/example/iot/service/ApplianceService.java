package com.example.iot.service;

import com.example.iot.model.Appliance;
import com.example.iot.model.ApplianceDTO;
import com.example.iot.model.Attribute;
import com.example.iot.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.iot.repository.ApplianceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplianceService {

    @Autowired
    ApplianceRepository repository;


    // save appliance to DB
    public List<Appliance> insertToDb(Appliance appliance) {

         repository.insert(appliance);
         return repository.findAll();
    }

    // convert applianceDto to appliance
    public Appliance convertToAppliance(ApplianceDTO app){
        Appliance appliance = new Appliance();
        appliance.setId(app.getId());
        appliance.setType(app.getType());
        appliance.setState(app.getState());
        appliance.setAttribute(app.getAttribute());

        Location loc = new Location();
        loc.setRoom(app.getLocation());
        appliance.setLocation(loc);

        return appliance;
    }


    // list all appliances
    public List<Appliance> getAll() {

        return repository.findAll();
    }

    // delete an appliance
    public void delete(String id) {
        repository.deleteById(id);
    }

    // delete all
    public void deleteAll() {
        repository.deleteAll();
    }


    // update the state
    public List<Appliance> updateState(String id) {
        Appliance appliance = repository.findById(id).get();

        if (appliance.getState().equalsIgnoreCase("on")) {
            appliance.setState("Off");
        } else if (appliance.getState().equalsIgnoreCase("off")) {
            appliance.setState("On");
        }
        repository.save(appliance);

        return repository.findAll();
    }

    // update current value +/-
    public List<Appliance> updateValue(String idAppliance, int index, int value){
       Appliance appliance =  repository.findById(idAppliance).get();

       List<Attribute> attrList = appliance.getAttribute();

        Attribute attribute = appliance.getAttribute().get(index);
        attribute.setValue(value);

       attrList.remove(index);
       attrList.add(index, attribute);

       appliance.setAttribute(attrList);

        repository.save(appliance);

        return repository.findAll();

    }












//    public List<Appliance> updateAppliance(int id, Appliance app) throws ResourceNotFoundException {
//    appliance = com.example.iot.repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appliance not found for this id :: " + id));
//
//    appliance.setState(app.getState());
//    appliance.setType(app.getType());
//    appliance.setLocation(app.getLocation());
//
//    final Appliance updatedAppliance = com.example.iot.repository.save(appliance);
//    return (List<Appliance>) updatedAppliance;
//
//}

}
