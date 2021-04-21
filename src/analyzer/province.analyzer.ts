import _ from 'lodash';

import { Analyzer } from '../models/analyzer.interface';
import { GeonameAddress } from '../models/geoname-address.interface';
import { Province } from '../models/province.interface';

/** Returns all provinces as Array. */
export class ProvinceAnalyzer implements Analyzer<GeonameAddress> {

    private _result: Province[] = [];

    run(addresses: GeonameAddress[]): void {

        this._result = addresses
            .map((address: GeonameAddress): Province => {
                return { name: address.state.toLowerCase(), viewValue: address.state, code: address.state_code };
            });

        this._result = _.uniqBy(this._result, province => province.code);

        this._result.forEach(province => delete province.code);
    }

    get result(): Province[] {

        return this._result;
    }

}
