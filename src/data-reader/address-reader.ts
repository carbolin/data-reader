import { DataReader } from '../models/DataReader';
import { Address } from '../models/Address';

export class AddressReader {

    private _addresses: Address[] = [];

    constructor(private reader: DataReader<Address>) { }

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
                    // tslint:disable-next-line: radix
                    province_code: parseInt(address.province_code),
                    community: address.community,
                    // tslint:disable-next-line: radix
                    community_code: parseInt(address.community_code),
                    // tslint:disable-next-line: radix
                    latitude: parseInt(address.latitude),
                    // tslint:disable-next-line: radix
                    longitude: parseInt(address.longitude),
                };
            });
    }

    get adresses(): Address[] {

        return this._addresses;
    }
}
