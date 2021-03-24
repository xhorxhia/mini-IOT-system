package controller;

import model.Appliance;
import org.apache.velocity.exception.ResourceNotFoundException;
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
    private ApplianceRepository repository;
    private Appliance appliance;

    public ApplianceController(ApplianceRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/add")
    public Appliance addAppliance(@RequestBody Appliance appliance) {
        return service.insertToDb(appliance);
    }

    @GetMapping("/showAll")
    public List<Appliance> getAppliances() {
        return service.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAppliance(@PathVariable int id) {
        service.delete(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        service.deleteAll();
    }

    @PutMapping("/edit/{id}")
    public List<Appliance> update(@PathVariable int id, @RequestBody Appliance app){
     return  service.updateAppliance(id, app);
    }


//    @PutMapping("/edit/{id}")
//    public List<Appliance> updateAppliance(@PathVariable int id, @RequestBody Appliance app) throws ResourceNotFoundException {
//        appliance = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appliance not found for this id :: " + id));
//
//        appliance.setState(app.getState());
//        appliance.setType(app.getType());
//        appliance.setLocation(app.getLocation());
//
//        final Appliance updatedAppliance = repository.save(appliance);
//        return (List<Appliance>) updatedAppliance;
//
//    }
}
