import { JsonFileReader } from './file-reader/json-file-reader';
import { AddressReader } from './data-reader/AddressReader';
import { Address } from './models/Address';
import { ProvinceAnalyzer } from './analyzer/province-analyser';
import { JsonReport } from './reporter/JsonReport';
import { Province } from './models/Province';

const fileReader = new JsonFileReader<Address>('plz_test.json');
fileReader.read();

const addressReader = new AddressReader(fileReader);
addressReader.load();

const analyzer = new ProvinceAnalyzer();
analyzer.run(addressReader.adresses);

const report = new JsonReport<Partial<Province>>();
report.print(analyzer.result);



interface UserPrpos {

    name: string;
    age: number;
    id: number;
}

class Attributes<T> {

    constructor(private data: T) { }

    get<K extends keyof T>(key: K): T[K] {

        return this.data[key];
    }

}


const attr = new Attributes<UserPrpos>({ name: 'dirk', age: 34, id: 3 });
console.log(attr.get('name'));
