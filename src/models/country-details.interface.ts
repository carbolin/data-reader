import { Province } from './province.interface';

export interface CountryDetails {

    alpha2Code: string;
    name: string;
    flag: string;
    viewValue: string;
    provinces: Province[];
}