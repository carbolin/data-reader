import { Analyzer } from '../models/Analyzer';
import { Province } from '../models/Province';
import { Address } from '../models/Address';
import _ from 'lodash';


export class ProvinceAnalyzer implements Analyzer<Address> {

    private _result: Partial<Province>[] = [];

    run(addresses: Address[]): void {

        let provinces: Partial<Province>[] = addresses.map((address: Address): Partial<Province> => {
            return { country: { code: address.country_code.toLowerCase() }, code: address.state_code.toLowerCase(), name: address.state.toLowerCase() };
        });

        provinces = _.uniqBy(provinces, province => province.code);

        provinces.forEach((province: Partial<Province>) => {

            const places = {};

            const zipcodes: string[] = _.uniq(addresses
                .filter((address: Address): boolean => address.state_code.toLowerCase() === province.code)
                .map((address: Address): string => address.zipcode));


            zipcodes.forEach((zipcode) => {

                const placesPerZip = addresses
                    .filter((address: Address): boolean => address.zipcode === zipcode)
                    .map((address: Address) => address.place.toLowerCase());

                Object.assign(places, { [zipcode]: placesPerZip });

            });

            this._result.push({ ...province, zipcodes, places });
        });
    }

    get result(): Partial<Province>[] {

        return this._result;
    }

}
