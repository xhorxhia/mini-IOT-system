package service;

import model.Appliance;
import org.springframework.beans.factory.annotation.Autowired;
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

    // turnOnOff appliance
    public void changeState(int id){
        appliance = repository.findById(id).get();
    System.out.println(appliance);

        if(appliance.getState().equalsIgnoreCase("on")){
            appliance.setState("Off");
        }else if(appliance.getState().equalsIgnoreCase("off")){
            appliance.setState("On");
        }
    }
}
