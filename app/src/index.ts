import yargs, {Argv} from "yargs";
import { Location } from "./models/location";
import { TimeService } from "./services/timeService";
import { LatLngService } from "./services/latLngService";
import { WeatherService } from "./services/wheatherService";

let argv = yargs
        .option('location', {
            alias: 'l',
            description: "location name or postal code",
            demand: true
        }).argv;


console.log("fetching time and wheather for " + argv.location);
console.log("------------------------------------------------------------------------");
const locations = argv.location.split(',');

let getTimeAndWheather = async(location: Location) => {
    try {
        const latLngService = new LatLngService(location);
        const latLng = await latLngService.getLatLng();
        const timeService = new TimeService(latLng);
        const time = await timeService.getTime();
        const wheatherService = new WeatherService(latLng);
        const temp = await wheatherService.getWheater();
        return `The Weather in ${location.name} is ${temp.weather}°C, while time is ${time.time}`;
    } catch (e) {
        console.log(e);
        return `No Weather info for:  ${location.name}`;
    }
}


for (let i = 0; i < locations.length; i++) {
  const location: Location = {
        name: locations[i],
        postalCode: locations[i]
  }

  getTimeAndWheather(location)
    .then(message => console.log(message))
    .catch(err => console.log(err));
}

