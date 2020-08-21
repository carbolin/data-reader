import { Analyzer } from '../models/Analyzer';
import { ProvinceDetails } from '../models/ProvinceDetails';
import { Address } from '../models/Address';
import _ from 'lodash';


export class ProvinceAnalyzer implements Analyzer<Address> {

    private _result: Partial<ProvinceDetails>[] = [];

    run(addresses: Address[]): void {

        let provinces: Partial<ProvinceDetails>[] = addresses.map((address): Partial<ProvinceDetails> => {
            return { alpha2Code: address.country_code, country: { alpha2Code: address.country_code, name: 'niederlande', capital: 'amsterdam', callingCodes: ['31'], flag: 'https://firebasestorage.googleapis.com/v0/b/dentalmergedev.appspot.com/o/data%2Fimages%2Fflags%2Fpng%2Fnl.png?alt=media&token=9321838d-8ef1-4ff6-97c8-69afef9b1de2' }, code: address.state_code, name: address.state };
        });

        provinces = _.uniqBy(provinces, province => province.code);

        provinces.forEach((province: Partial<ProvinceDetails>) => {

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

    get result(): Partial<ProvinceDetails>[] {

        return this._result;
    }

}
