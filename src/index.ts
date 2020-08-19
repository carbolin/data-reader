import { Address } from './models/Address';
import { ProvinceAnalyzer } from './analyzer/province-analyser';
import { Province } from './models/Province';
import { firebaseConfig } from './firebase-config';
import { TxtFileReader } from './file-reader/txt-file-reader';
import { GeonameReader } from './data-reader/geoname-reader';
import { JsonReport } from './reports/json-report';

// const fileReader = new JsonFileReader<Address>('plz_li.json');

// const addressReader = new AddressReader(fileReader);
// addressReader.load();

// const analyzer = new ProvinceAnalyzer();
// analyzer.run(addressReader.adresses);

// const report = new JsonReport<Partial<Province>>();
// report.print(analyzer.result);

// const firestore = new DbInitiator(firebaseConfig);
// const db = firestore.dbInit();
// const report = new FirestoreReport<Partial<Province>>(db, 'test');
// report.print(analyzer.result);

const fileReader = new TxtFileReader('../plz_li.txt');

const addressReader = new GeonameReader(fileReader);
addressReader.load();
console.log(addressReader.adresses);
const analyzer = new ProvinceAnalyzer();
analyzer.run(addressReader.adresses);
console.log(analyzer.result);
const report = new JsonReport<Partial<Province>>();
report.print(analyzer.result);



// interface UserPrpos {

//     name: string;
//     age: number;
//     id: number;
// }

// class Attributes<T> {

//     constructor(private data: T) { }

//     get<K extends keyof T>(key: K): T[K] {

//         return this.data[key];
//     }

// }


// const attr = new Attributes<UserPrpos>({ name: 'dirk', age: 34, id: 3 });
// console.log(attr.get('name'));
