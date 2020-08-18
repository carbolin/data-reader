import fs from 'fs';
import { DataReader } from '../models/DataReader';

export class JsonFileReader<T> implements DataReader<T> {

    data: T[] = [];

    constructor(private _fileName: string) { }

    read(): void {

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
