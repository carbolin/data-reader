import { Analyzer } from '../models/Analyzer';
import { Address } from '../models/Address';
import _ from 'lodash';


export class ZipcodeAnalyzer<T extends Address> implements Analyzer<T> {

    private _result: string[] = [];

    run(addresses: T[]): void {

        this._result = _.uniq(addresses
            .map((address: T): string => address.zipcode));

    }

    get result(): string[] {

        return this._result;
    }

}
