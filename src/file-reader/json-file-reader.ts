import fs from 'fs';
import path from 'path';
import { DataReader } from '../models/DataReader';

export class JsonFileReader implements DataReader {

    data: string[] = [];

    constructor(private _fileName: string) { }

    read(): void {

        if (path.extname(this._fileName) !== '.json')
            throw new Error(`${this._fileName} is not of JSON Format`);

        this.data = JSON.parse(fs.readFileSync(this._fileName, {
            encoding: 'utf-8'
        }));

        if (this.data.constructor !== Array)

            throw new Error(`Data in ${this._fileName} is not of Type JSON Array. Please provide a JSON Array`);
    }

    get fileName(): string {
        return this._fileName;
    }

}
