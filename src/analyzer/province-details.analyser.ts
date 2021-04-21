import _ from 'lodash';

import { Analyzer } from '../models/analyzer.interface';
import { GeonameAddress } from '../models/geoname-address.interface';
import { ProvinceDetails } from '../models/province-details.interface';

/** Returns for each province all zipcodes as Array, all places for each zipcode as Array and some details about the country. */
export class ProvinceDetailsAnalyzer implements Analyzer<GeonameAddress> {

    private _result: ProvinceDetails[] = [];

    run(addresses: GeonameAddress[]): void {

        let provinceDetails: ProvinceDetails[] = addresses.map((address): ProvinceDetails => {
            return {
                alpha2Code: address.country_code,
                code: address.state_code,
                name: address.state.toLowerCase(),
                viewValue: address.state,
                zipcodes: [],
                places: {}
            };
        });

        provinceDetails = _.uniqBy(provinceDetails, province => province.code);

        provinceDetails.forEach((province: ProvinceDetails) => {

            const places = {};

            const zipcodes: string[] = _.uniq(addresses
                .filter((address: GeonameAddress): boolean => address.state_code === province.code)
                .map((address: GeonameAddress): string => address.zipcode))
                .sort((a, b) => a > b ? 1 : -1);

            delete province.code;

            zipcodes.forEach((zipcode) => {

                const placesPerZip = addresses
                    .filter((address: GeonameAddress): boolean => address.zipcode === zipcode)
                    .map((address: GeonameAddress) => address.place);

                Object.assign(places, { [zipcode]: placesPerZip });

            });

            this._result.push({ ...province, zipcodes, places });
        });
    }

    get result(): ProvinceDetails[] {

        return this._result;
    }
}
