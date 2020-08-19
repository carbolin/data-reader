import { DataReader } from '../models/DataReader';
import { Address } from '../models/Address';

export class AddressReader {

    private _addresses: Address[] = [];

    constructor(private reader: DataReader) { }

    load(): void {

        this.reader.read();

        this._addresses = this.reader.data
            .map((address: any): Address => {
                return {
                    country_code: address.country_code,
                    zipcode: address.zipcode,
                    place: address.place,
                    state: address.state,
                    state_code: address.state_code,
                    province: address.province,
                    province_code: parseInt(address.province_code, 10),
                    community: address.community,
                    community_code: parseInt(address.community_code, 10),
                    latitude: parseInt(address.latitude, 10),
                    longitude: parseInt(address.longitude, 10),
                };
            });
    }

    get adresses(): Address[] {

        return this._addresses;
    }
}
