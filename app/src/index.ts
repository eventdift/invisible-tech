import yargs, {Argv} from "yargs";
import { Location } from "./models/location";

let argv = yargs
        .option('location', {
            alias: 'l',
            description: "location name or postal code",
            demand: true
        }).argv;


console.log("fetching time and wheather for " + argv.location);
const locations = argv.location.split(',');

for (let i = 0; i < locations.length; i++) {
  console.log(locations[i]);
}

//keeps server alive
do
{
}while(0==0)