package com.example.iot.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Appliance")
public class Appliance {

    @Id
    private String id;
    private String type;
    private String state;
    private Location location;
    private List<Attribute> attribute;

    public Appliance() {
    }

    public Appliance(String id, String state, Location location, Attribute attribute) {
        this.id = id;
        this.state = state;
        this.location = location;
        this.attribute = (List<Attribute>) attribute;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Attribute> getAttribute() {
        return attribute;
    }

    public void setAttribute(List<Attribute> attribute) {
        this.attribute = (List<Attribute>) attribute;
    }
}
