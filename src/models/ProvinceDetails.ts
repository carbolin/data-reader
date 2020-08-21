import { Country } from './Country';
import { Province } from './Province';

export interface ProvinceDetails extends Province{

    alpha2Code: string;
    country: Country;
    places: {[key: string]: string[]};
    zipcodes: string[];
}
