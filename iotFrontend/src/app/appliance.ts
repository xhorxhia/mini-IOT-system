import { Attribute } from "./attribute";
import { Location } from "./location";

export class Appliance {
    id: String ;
	type:String; 
    state: String;
	location: Location;
    attribute: Attribute;
}
