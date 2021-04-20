import _ from 'lodash';

import { Address } from '../models/Address';
import { Analyzer } from '../models/Analyzer';
import { ProvinceDetails } from '../models/ProvinceDetails';

export class StateAnalyzer implements Analyzer<Address> {

    private _result: Partial<ProvinceDetails>[] = [];

    run(addresses: Address[]): void {

        const provinces: Partial<ProvinceDetails>[] = addresses
            .map((address: Address): Partial<ProvinceDetails> => {
                return { code: address.state_code, name: address.state };
            });

        this._result = _.uniqBy(provinces, province => province.code);
    }

    get result(): Partial<ProvinceDetails>[] {

        return this._result;
    }

}
