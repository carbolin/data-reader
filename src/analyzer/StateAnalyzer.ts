import * as _ from 'lodash';
import { Analyzer } from '../models/Analyzer';
import { Province } from '../models/Province';


interface StateConstraint {

    country_code: string;
    state_code: string;
    state: string;
}

export class StateAnalyzer<T extends StateConstraint> implements Analyzer<T> {

    private _result!: Partial<Province>[];

    run(addresses: T[]): void {

        const provinces: Partial<Province>[] = addresses
            .map((address: T): Partial<Province> => {
                return { country: { code: address.country_code }, code: address.state_code, name: address.state }
            });

        this._result = _.uniqBy(provinces, province => province.code);
    }

    get result(): Partial<Province>[] {

        return this._result;
    }

}
