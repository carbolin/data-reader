import { DataReader } from '../models/DataReader';
import path from 'path';
import fs from 'fs';
import _, { Dictionary } from 'lodash';

export class GeoFileReader implements DataReader {

    data: Dictionary<string>[] = [];
    private address: string[] = ['country_code', 'zipcode', 'place', 'state', 'state_code', 'province', 'province_code', 'community', 'community_code', 'latitude', 'longitude'];

    constructor(private _fileName: string) { }

    read(): void {

        if (path.extname(this._fileName) !== '.txt')

            throw new Error(`${this._fileName} is not of TXT Format`);

        this.data = fs.readFileSync(this._fileName, {
            encoding: 'utf-8'
        })
            .split('\n')
            .map((row: string): string[] => _.dropRight(row.split('\t')))
            .map((element: string[]): Dictionary<string> => _.zipObject(this.address, element));
    }

    get fileName(): string {
        return this._fileName;
    }

}
