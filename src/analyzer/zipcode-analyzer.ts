import _ from 'lodash';

import { Address } from '../models/Address';
import { Analyzer } from '../models/Analyzer';

export interface Zipcodes {
    zipcodes: string[];
    alpha2Code: string;
}

export class ZipcodeAnalyzer implements Analyzer<Address> {

    private _result: Zipcodes[] = [{ alpha2Code: '', zipcodes: [] }];

    run(addresses: Address[]): void {

        const alpha2Code = addresses.map((address: Address): string => address.country_code)[0];

        const zipcodes = _.uniq(addresses
            .map((address: Address): string => address.zipcode)
            .sort((a, b) => a > b ? 1 : -1)
        );

        this._result = [{ zipcodes, alpha2Code }];
    }

    get result(): Zipcodes[] {

        return this._result;
    }

}
