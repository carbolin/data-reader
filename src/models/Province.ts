import { Country } from './Country';

export interface Province {

    alpha2Code: string;
    code: string;
    name: string;
    country: Country;
    places: {[key: string]: string[]};
    zipcodes: string[];
}
