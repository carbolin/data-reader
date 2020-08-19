import fs from 'fs';
import path from 'path';
import _, { Dictionary } from 'lodash';
import { DataReader } from '../models/DataReader';


export class CSVFileReader implements DataReader {

    data: Dictionary<string>[] = [];
    private address: string[] = ['country_code', 'zipcode', 'place', 'state', 'state_code', 'province', 'province_code', 'community', 'community_code', 'latitude', 'longitude'];


    constructor(private _fileName: string) { }

    read(): void {

        if (path.extname(this._fileName) === '.csv')

            this.data = fs.readFileSync(this._fileName, {

                encoding: 'utf-8'
            })
                .split('\n')
                .map((row: string): string[] => row.split(','))
                .map((element: string[]): Dictionary<string> => _.zipObject(this.address, element));

        else throw new Error(`${this._fileName} is not of CSV Format`);
    }

    get fileName(): string {
        return this._fileName;
    }
}
