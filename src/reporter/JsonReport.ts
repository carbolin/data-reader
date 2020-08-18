import fs from 'fs';
import _ from 'lodash';
import { OutputTarget } from '../models/OutputTarget';


export class JsonReport<T> implements OutputTarget<T> {

    print(report: T[]): void {

        const fileName = 'report.json';

        fs.writeFile(`../${new Date().getTime()}_${fileName}`, JSON.stringify(report), () => {

            console.log(`files written to ${new Date().getTime()}_${fileName}`);

        });
    }

}



