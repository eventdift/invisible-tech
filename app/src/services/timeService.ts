import  { LatLng }  from "../models/latLng";
import { Time } from "../models/evaluation";

export class TimeService {
  latLng: LatLng;
  time: Time = {
      time: "test"
  }

  constructor(latLng: LatLng) {
    this.latLng = latLng;
  }

  getTime(): Time {
    return this.time;
  }
}
