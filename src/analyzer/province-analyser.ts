import _ from 'lodash';

import { Address } from '../models/Address';
import { Analyzer } from '../models/Analyzer';
import { ProvinceDetails } from '../models/ProvinceDetails';

export class ProvinceAnalyzer implements Analyzer<Address> {

    private _result: ProvinceDetails[] = [];

    run(addresses: Address[]): void {

        let provinces: ProvinceDetails[] = addresses.map((address): ProvinceDetails => {
            return {
                alpha2Code: address.country_code,
                code: address.state_code,
                name: address.state,
                zipcodes: []
            };
        });

        provinces = _.uniqBy(provinces, province => province.code);

        provinces.forEach((province: ProvinceDetails) => {

            // const places = {};

            const zipcodes: string[] = _.uniq(addresses
                .filter((address: Address): boolean => address.state_code === province.code)
                .map((address: Address): string => address.zipcode))
                .sort((a, b) => a > b ? 1 : -1);


            delete province.code;


            // zipcodes.forEach((zipcode) => {

            //     const placesPerZip = addresses
            //         .filter((address: Address): boolean => address.zipcode === zipcode)
            //         .map((address: Address) => address.place);

            //     Object.assign(places, { [zipcode]: placesPerZip });

            // });

            // this._result.push({ ...province, zipcodes, places });

            this._result.push({ ...province, zipcodes });
        });
    }

    get result(): ProvinceDetails[] {

        return this._result;
    }

}
