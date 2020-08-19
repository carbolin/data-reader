import { DataReader } from '../models/DataReader';
import { Address } from '../models/Address';
import { Dictionary } from 'lodash';
import _ from 'lodash';

export class GeonameReader {

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
                    country_code: element.country_code.toLowerCase(),
                    zipcode: element.zipcode.toLowerCase(),
                    place: element.place.toLowerCase(),
                    state: element.state.toLowerCase(),
                    state_code: element.state_code.toLowerCase(),
                    province: element.province.toLowerCase(),
                    province_code: +element.province_code,
                    community: element.community.toLowerCase(),
                    community_code: +element.community_code,
                    latitude: +element.latitude,
                    longitude: +element.longitude
                };
            });

    }

    get adresses(): Address[] {

        return this._addresses;
    }
}
