import { Province } from './province.interface';

export interface ProvinceDetails extends Province {

    alpha2Code: string;
    zipcodes: string[];
    places: { [key: string]: string[] };
}
