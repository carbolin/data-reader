import _ from 'lodash';

import { Analyzer } from '../models/analyzer.interface';
import { CountryDetails } from '../models/country-details.interface';
import { Country } from '../models/country.interface';
import { GeonameAddress } from '../models/geoname-address.interface';
import { Province } from '../models/province.interface';

/** Returns information about the country and provinces as Array. */
export class CountryDetailsAnalyzer implements Analyzer<GeonameAddress> {

    constructor(private _name: string, private _flag: string, private _viewValue: string) { }

    private _result: CountryDetails[] = [];

    run(addresses: GeonameAddress[]): void {

        const country: Country = { alpha2Code: addresses[0].country_code, name: this._name, viewValue: this._viewValue, flag: this._flag };

        let provinces: Province[] = addresses
            .map((address: GeonameAddress): Province => {
                return { name: address.state.toLowerCase(), viewValue: address.state, code: address.state_code };
            });

        provinces = _.uniqBy(provinces, province => province.code);

        provinces.forEach(province => delete province.code);

        this._result.push({ ...country, provinces });
    }

    get result(): CountryDetails[] {

        return this._result;
    }

}
