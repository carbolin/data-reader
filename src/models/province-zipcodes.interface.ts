import { Province } from './province.interface';

export interface ProvinceZipcodes extends Province{

    alpha2Code: string;
    zipcodes: string[];
}
