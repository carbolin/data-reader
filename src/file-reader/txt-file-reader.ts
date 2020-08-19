import { DataReader } from '../models/DataReader';
import path from 'path';
import fs from 'fs';

export class TxtFileReader implements DataReader<string[]> {

    data: string[][] = [];

    constructor(private _fileName: string) { }

    read(): void {

        if (path.extname(this._fileName) === '.txt')

            this.data = fs.readFileSync(this._fileName, {
                encoding: 'utf-8'
            })
                .split('\n')
                .map((row: string): string[] => row.split('\t'));

        else throw new Error(`${this._fileName} is not of TXT Format`);

    }

    get fileName(): string {
        return this._fileName;
    }

}
