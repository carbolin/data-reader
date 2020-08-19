import { DataReader } from '../models/DataReader';
import { Address } from '../models/Address';
import { Dictionary } from 'lodash';
import _ from 'lodash';

export class AddressReader {

    private _addresses: Address[] = [];
    private keys: string[] = ['country_code', 'zipcode', 'place', 'state', 'state_code', 'province', 'province_code', 'community', 'community_code', 'latitude', 'longitude'];


    constructor(private reader: DataReader) { }

    load(): void {

        this.reader.read();

        this._addresses = this.reader.data
            .map((element: string[]): Dictionary<string> => {

                element = _.dropRight(element);

                return _.zipObject<string>(this.keys, element);
            })
            .map((element: Dictionary<string>): Address => {

                return {
                    country_code: element.country_code,
                    zipcode: element.zipcode,
                    place: element.place,
                    state: element.state,
                    state_code: element.state_code,
                    province: element.province,
                    province_code: parseInt(element.province_code, 10),
                    community: element.community,
                    community_code: parseInt(element.community_code, 10),
                    latitude: parseInt(element.latitude, 10),
                    longitude: parseInt(element.longitude, 10),
                };
            });

    }

    get adresses(): Address[] {

        return this._addresses;
    }
}
