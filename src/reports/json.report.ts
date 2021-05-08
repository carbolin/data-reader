import fs from 'fs';
import _ from 'lodash';

import { OutputTarget } from '../models/output-target.interface';

export class JsonReport<T> implements OutputTarget<T> {

    print(report: any): void {

        const fileName = 'report.json';

        const dataTime = new Date().getTime();

        fs.writeFile(`../output/${dataTime}_${fileName}`, JSON.stringify(report), () => {

            console.log(`Report written to ${dataTime}_${fileName}`);

        });
    }

}
