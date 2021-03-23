package controller;

import model.Appliance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repository.ApplianceRepository;
import service.ApplianceService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("iot/")
public class ApplianceController {

    @Autowired
    private ApplianceService service;

    @PostMapping("/add")
    public Appliance addAppliance(@RequestBody Appliance appliance){
      return  service.insertToDb(appliance);
    }

    @GetMapping("/showAll")
    public List<Appliance> getAppliances(){
        return service.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAppliance(@PathVariable int id){
        service.delete(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAll(){
        service.deleteAll();
    }

    @PutMapping("/updateState/{id}")
    public void turnOnOff(@PathVariable int id){
        service.changeState(id);
    }
}
