import { Analyzer } from '../models/Analyzer';
import { Address } from '../models/Address';
import _ from 'lodash';


export class ZipcodeAnalyzer implements Analyzer<Address> {

    private _result: string[] = [];

    run(addresses: Address[]): void {

        this._result = _.uniq(addresses
            .map((address: Address): string => address.zipcode));
    }

    get result(): string[] {

        return this._result;
    }

}
