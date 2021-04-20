import fs from 'fs';
import _ from 'lodash';

import { OutputTarget } from '../models/OutputTarget';

export class JsonReport<T> implements OutputTarget<T> {

    print(report: any): void {

        const fileName = 'report.json';

        fs.writeFile(`../output/${new Date().getTime()}_${fileName}`, JSON.stringify(report), () => {

            console.log(`Report written to ${new Date().getTime()}_${fileName}`);

        });
    }

}
