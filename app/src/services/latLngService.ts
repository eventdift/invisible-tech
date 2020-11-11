import  { Location }  from "../models/location";
import { LatLng } from "../models/latLng";
import { get } from "https";
import { IncomingMessage } from "http";
import { URL } from "url";

export class LatLngService {
    location: Location = {
        name: "",
        postalCode: ""
    };
    latLng: LatLng = {
            lat: "test",
            lng: "test"
        };
    
    constructor(location: Location) {
        this.location = location;
    }

    async getLatLng() :Promise<any>{
        const formatedLocation = this.formatName();
        let url = new URL(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${formatedLocation}&key=`
        )
        try{
            let req = await get(url, (res: IncomingMessage) => {
                let result = "";
                if (res.statusCode) {
                    if (res.statusCode < 200 || res.statusCode >= 300) {
                        throw new Error("error " + res.statusCode);
                    }
                }
                res.on("data", data => {
                    result = JSON.parse(Buffer.from(data).toString())
                    console.log(result);
                })
                res.on("end", () => {
                    this.latLng.lat = result;
                    this.latLng.lng = result;
                });
                return this.latLng;
            })
        }catch (e){
            return this.latLng;
            console.log(e)
        }
        
        
        return this.latLng;
    }

    formatName(): string{
        return this.location.name.replace(" ", "+")
    }
}
