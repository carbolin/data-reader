import { Analyzer } from '../models/Analyzer';
import { Province } from '../models/Province';
import { Address } from '../models/Address';
import _ from 'lodash';


interface AddressConstraint {

    country_code: string;
    state_code: string;
    state: string;
    zipcode: string;
    place: string;

}

export class ProvinceAnalyzer<T extends AddressConstraint> implements Analyzer<T> {

    private _result: Partial<Province>[] = [];

    run(addresses: T[]): void {

        let provinces: Partial<Province>[] = addresses.map((address: T): Partial<Province> => {
            // tslint:disable-next-line: max-line-length
            return { country: { code: address.country_code.toLowerCase() }, code: address.state_code.toLowerCase(), name: address.state.toLowerCase() };
        });

        provinces = _.uniqBy(provinces, province => province.code);

        provinces.forEach((province: Partial<Province>) => {

            const places = {};

            const zipcodes: string[] = _.uniq(addresses
                .filter((address: T): boolean => address.state_code.toLowerCase() === province.code)
                .map((address: T): string => address.zipcode));


            zipcodes.forEach((zipcode) => {

                const placesPerZip = addresses
                    .filter((address: T): boolean => address.zipcode === zipcode)
                    .map((address: T) => address.place.toLowerCase());

                Object.assign(places, { [zipcode]: placesPerZip });

            });

            this._result.push({ ...province, zipcodes, places });
        });
    }

    get result(): Partial<Province>[] {

        return this._result;
    }

}
