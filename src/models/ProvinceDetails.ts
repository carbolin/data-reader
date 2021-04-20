import { Province } from './Province';

export interface ProvinceDetails extends Province{

    alpha2Code: string;
    zipcodes: string[];
}
