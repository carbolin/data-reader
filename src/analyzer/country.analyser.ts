import _ from 'lodash';

import { Analyzer } from '../models/analyzer.interface';
import { Country } from '../models/country.interface';
import { GeonameAddress } from '../models/geoname-address.interface';

/** Returns information about the country. */
export class CountryAnalyzer implements Analyzer<GeonameAddress> {

    constructor(private _name: string, private _flag: string, private _viewValue: string) { }

    private _result!: Country;

    run(addresses: GeonameAddress[]): void {

        this._result = { alpha2Code: addresses[0].country_code, name: this._name, viewValue: this._viewValue, flag: this._flag };
    }

    get result(): Country {

        return this._result;
    }

}
