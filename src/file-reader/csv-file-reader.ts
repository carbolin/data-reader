import fs from 'fs';
import path from 'path';
import { DataReader } from '../models/DataReader';

export class CSVFileReader implements DataReader<string[]> {

    data: string[][] = [];

    constructor(private _fileName: string) { }

    read(): void {

        if (path.extname(this._fileName) === '.csv')

            this.data = fs.readFileSync(this._fileName, {

                encoding: 'utf-8'
            })
                .split('\n')
                .map((row: string): string[] => row.split(','));

        else throw new Error(`${this._fileName} is not of CSV Format`);

    }

    get fileName(): string {
        return this._fileName;
    }
}
