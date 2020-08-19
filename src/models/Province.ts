import { Country } from './Country';

export interface Province {

    code: string;
    name: string;
    country: Country;
    places: {[key: string]: string[]};
    zipcodes: string[];
}
