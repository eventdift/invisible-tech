import  { LatLng }  from "../models/latLng";
import {  Weather } from "../models/evaluation";
import { get } from "https";
import { IncomingMessage } from "http";
import { URL } from "url";

export class WeatherService {
    latLng: LatLng;
    weather: Weather = {
      weather: "test"
    }
    constructor(latLng: LatLng) {
        this.latLng = latLng;
    }

    async getWheater(): Promise<Weather> {
        let url = new URL(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.latLng.lat}&lon=${this.latLng.lng}&appid=APIkey`
        )
        try{
            let req = await get(url, (res: IncomingMessage) => {
                let result = "";
                if (res.statusCode) {
                    if (res.statusCode < 200 || res.statusCode >= 300) {
                        console.log(res.statusCode);
                    }
                }
                res.on("data", data => {
                    result = JSON.parse(Buffer.from(data).toString())
                })
                res.on("end", () => {
                    this.weather.weather = result;                
                });
                return this.weather;
            })
        }catch (e){
            return this.weather;
        }
        return this.weather;
    }
}
