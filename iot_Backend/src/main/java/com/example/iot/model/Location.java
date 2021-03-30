package com.example.iot.model;

import org.springframework.data.annotation.Id;

public class Location {

    @Id
    private int id;
    private String room;

    public Location() {
    }

    public Location(int id, String room) {
        this.id = id;
        this.room = room;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

}
