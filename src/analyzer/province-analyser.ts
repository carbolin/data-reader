import { Analyzer } from '../models/Analyzer';
import { Province } from '../models/Province';
import { Address } from '../models/Address';
import _ from 'lodash';


export class ProvinceAnalyzer implements Analyzer<Address> {

    private _result: Partial<Province>[] = [];

    run(addresses: Address[]): void {

        let provinces: Partial<Province>[] = addresses.map((address): Partial<Province> => {
            return { country: { alpha2Code: address.country_code, name: 'österreich', capital: 'wien', callingCodes: ['43'], flag: 'https://firebasestorage.googleapis.com/v0/b/dentalmergedev.appspot.com/o/data%2Fimages%2Fflags%2Fsvg%2Fat.svg?alt=media&token=94cd3d58-9ec5-42fe-b407-0ad1c242b3fa' }, code: address.state_code, name: address.state };
        });

        provinces = _.uniqBy(provinces, province => province.code);

        provinces.forEach((province: Partial<Province>) => {

            const places = {};

            const zipcodes: string[] = _.uniq(addresses
                .filter((address: Address): boolean => address.state_code === province.code)
                .map((address: Address): string => address.zipcode));


            zipcodes.forEach((zipcode) => {

                const placesPerZip = addresses
                    .filter((address: Address): boolean => address.zipcode === zipcode)
                    .map((address: Address) => address.place);

                Object.assign(places, { [zipcode]: placesPerZip });

            });

            this._result.push({ ...province, zipcodes, places });
        });
    }

    get result(): Partial<Province>[] {

        return this._result;
    }

}
