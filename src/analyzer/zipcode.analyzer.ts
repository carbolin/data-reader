import _ from 'lodash';

import { Analyzer } from '../models/analyzer.interface';
import { GeonameAddress } from '../models/geoname-address.interface';

export interface Zipcodes {
    zipcodes: string[];
    alpha2Code: string;
}

/** Returns all Zipcodes of a country as Array and some details about the country itself.*/
export class ZipcodeAnalyzer implements Analyzer<GeonameAddress> {

    private _result: Zipcodes[] = [{ alpha2Code: '', zipcodes: [] }];

    run(addresses: GeonameAddress[]): void {

        const alpha2Code = addresses.map((address: GeonameAddress): string => address.country_code)[0];

        const zipcodes = _.uniq(addresses
            .map((address: GeonameAddress): string => address.zipcode)
            .sort((a, b) => a > b ? 1 : -1)
        );

        this._result = [{ zipcodes, alpha2Code }];
    }

    get result(): Zipcodes[] {

        return this._result;
    }

}
