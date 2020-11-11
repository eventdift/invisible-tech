import  { LatLng }  from "../models/latLng";
import {  Weather } from "../models/evaluation"

export class WeatherService {
    latLng: LatLng;
    weather: Weather = {
      weather: "test"
    }
    constructor(latLng: LatLng) {
        this.latLng = latLng;
    }

    getWheater(): Weather {
        return this.weather;
    }
}
