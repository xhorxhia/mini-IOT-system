package com.example.iot.model;


import org.springframework.data.annotation.Id;

public class Attribute {

    @Id
    private int id;
    private String name;
    private int min, max;
    private int value;

    public Attribute() {
    }

    public Attribute(int id, String name, int min, int max,int value) {
        this.id = id;
        this.name = name;
        this.min = min;
        this.max = max;
        this.value = value;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
