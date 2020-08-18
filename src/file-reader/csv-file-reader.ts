import fs from 'fs';
import { DataReader } from '../models/DataReader';

export class CSVFileReader implements DataReader<string[]> {

    data: string[][] = [];

    constructor(private _fileName: string) { }

    read(): void {

        this.data = fs.readFileSync(this._fileName, {

            encoding: 'utf-8'
        })
            .split('\n')
            .map((row: string): string[] => row.split(','));
    }

    get fileName(): string {
        return this._fileName;
    }
}
