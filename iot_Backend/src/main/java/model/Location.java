package model;

public class Location {

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

    public void setRoom(String room1) {
        this.room = room;
    }

}
