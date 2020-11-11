import  { LatLng }  from "../models/latLng";
import { Time } from "../models/evaluation";
import { get } from "https";
import { IncomingMessage } from "http";
import { URL } from "url";

export class TimeService {
  latLng: LatLng;
  time: Time = {
      time: "test"
  }

  constructor(latLng: LatLng) {
    this.latLng = latLng;
  }

  async getTime(): Promise<Time> {
    let url = new URL(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${this.latLng.lat},${this.latLng.lng}&timestamp=1331161200&key=YOUR_API_KEY`
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
                    this.time.time = result;                });
                return this.time;
            })
        }catch (e){
            return this.time;
        }
    return this.time;
  }
}
