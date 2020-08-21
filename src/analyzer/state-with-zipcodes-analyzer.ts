import { Analyzer } from '../models/Analyzer';
import { ProvinceDetails } from '../models/ProvinceDetails';
import { Address } from '../models/Address';
import _ from 'lodash';


export class StateWithZipcodesAnalyzer implements Analyzer<Address> {

    private _result: Partial<ProvinceDetails>[] = [];

    run(addresses: Address[]): void {

        let provinces: Partial<ProvinceDetails>[] = addresses.map((address: Address): Partial<ProvinceDetails> => {
            return { country: { code: address.country_code }, code: address.state_code, name: address.state };
        });

        provinces = _.uniqBy(provinces, province => province.code);

        provinces.forEach((province: Partial<ProvinceDetails>): void => {

            const zipcodes: string[] = _.uniq(addresses
                .filter((address: Address): boolean => address.state_code === province.code)
                .map((address: Address): string => address.zipcode));

            this._result.push({ ...province, zipcodes });
        });
    }

    get result(): Partial<ProvinceDetails>[] {

        return this._result;
    }

}
