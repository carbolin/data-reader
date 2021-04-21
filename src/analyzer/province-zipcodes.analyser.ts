import _ from 'lodash';

import { Analyzer } from '../models/analyzer.interface';
import { GeonameAddress } from '../models/geoname-address.interface';
import { ProvinceZipcodes } from '../models/province-zipcodes.interface';

/** Returns for each province all zipcodes as Array and some details about the country. */
export class ProvinceZipcodesAnalyzer implements Analyzer<GeonameAddress> {

    private _result: ProvinceZipcodes[] = [];

    run(addresses: GeonameAddress[]): void {

        let provinces: ProvinceZipcodes[] = addresses.map((address): ProvinceZipcodes => {
            return {
                alpha2Code: address.country_code,
                code: address.state_code,
                name: address.state.toLowerCase(),
                zipcodes: [],
                viewValue: address.state,
            };
        });

        provinces = _.uniqBy(provinces, province => province.code);

        provinces.forEach((province: ProvinceZipcodes) => {

            const zipcodes: string[] = _.uniq(addresses
                .filter((address: GeonameAddress): boolean => address.state_code === province.code)
                .map((address: GeonameAddress): string => address.zipcode))
                .sort((a, b) => a > b ? 1 : -1);

            delete province.code;

            this._result.push({ ...province, zipcodes });
        });
    }

    get result(): ProvinceZipcodes[] {

        return this._result;
    }

}
