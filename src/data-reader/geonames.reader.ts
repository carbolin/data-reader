import _, { Dictionary } from 'lodash';

import { DataReader } from '../models/data-reader.interface';
import { GeonameAddress } from '../models/geoname-address.interface';

export class GeonameReader {

    private _addresses: GeonameAddress[] = [];
    private keys: string[] = ['country_code', 'zipcode', 'place', 'state', 'state_code', 'province', 'province_code', 'community', 'community_code', 'latitude', 'longitude'];

    // AT	7000	Eisenstadt	Burgenland	01	Eisenstadt Stadt	101	Eisenstadt	10101	47.8457	16.5233	4

    constructor(private reader: DataReader) { }

    load(): void {

        this.reader.read();

        this._addresses = this.reader.data
            .map((element: string[]): Dictionary<string> => {

                element = _.dropRight(element);

                return _.zipObject<string>(this.keys, element);
            })
            .map((element: Dictionary<string>): GeonameAddress => {

                return {
                    country_code: element.country_code.toLowerCase(),
                    zipcode: element.zipcode.toLowerCase(),
                    place: element.place.toLowerCase(),
                    state: element.state,
                    state_code: element.state_code.toLowerCase(),
                    province: element.province,
                    province_code: +element.province_code,
                    community: element.community.toLowerCase(),
                    community_code: +element.community_code,
                    latitude: +element.latitude,
                    longitude: +element.longitude
                };
            });

    }

    get adresses(): GeonameAddress[] {

        return this._addresses;
    }
}
