package service;

import model.Appliance;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import repository.ApplianceRepository;

import java.util.List;

public class ApplianceService {

    @Autowired
    ApplianceRepository repository;
    Appliance appliance;

    // save to DB
    public Appliance insertToDb(Appliance appliance){
        return  repository.insert(appliance);
    }

    // list all appliances
    public List<Appliance> getAll(){
        return  repository.findAll();
    }

    // delete an appliance
    public void delete(int id){
        repository.deleteById(id);
    }

    // delete all
    public void deleteAll(){
        repository.deleteAll();
    }


    // update the appliance
    public List<Appliance> updateAppliance(int id, Appliance app) throws ResourceNotFoundException {
    appliance = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appliance not found for this id :: " + id));

    appliance.setState(app.getState());
    appliance.setType(app.getType());
    appliance.setLocation(app.getLocation());

    final Appliance updatedAppliance = repository.save(appliance);
    return (List<Appliance>) updatedAppliance;

}

}
