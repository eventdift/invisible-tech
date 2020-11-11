import  { Location }  from "../models/location";
import { LatLng } from "../models/latLng";

export class LatLngService {
    location: Location;
    latLng: LatLng = {
            lat: "test",
            lng: "test"
        };
    
    constructor(location: Location) {
        this.location = location;
    }

    getLatLng() :LatLng{
        return this.latLng;
    }
}
