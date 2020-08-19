import * as _ from 'lodash';
import { Analyzer } from '../models/Analyzer';
import { Province } from '../models/Province';
import { Address } from '../models/Address';


export class StateAnalyzer implements Analyzer<Address> {

    private _result: Partial<Province>[] = [];

    run(addresses: Address[]): void {

        const provinces: Partial<Province>[] = addresses
            .map((address: Address): Partial<Province> => {
                return { country: { code: address.country_code }, code: address.state_code, name: address.state };
            });

        this._result = _.uniqBy(provinces, province => province.code);
    }

    get result(): Partial<Province>[] {

        return this._result;
    }

}
