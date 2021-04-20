import { firestore } from 'firebase';

import { OutputTarget } from '../../models/OutputTarget';

export class FirestoreReport<T> implements OutputTarget<T> {

    constructor(private _db: firestore.Firestore, private _collection: string, private _doc?: string) { }

    async print(report: T[]): Promise<void> {

        console.log('Anzahl der Dokumente: ', report.length);

        if (report.length <= 500) {

            const batch: firestore.WriteBatch = this._db.batch();

            const collectionRef: firestore.CollectionReference<firestore.DocumentData>
                = this._db.collection(this._collection);

            const FieldValue = firestore.FieldValue;

            report.forEach((doc: firestore.DocumentData) => {

                let docRef: firestore.DocumentReference<firestore.DocumentData>

                if (this._doc) {

                    docRef = collectionRef.doc(this._doc);
                }

                else

                    docRef = collectionRef.doc();

                batch.set(docRef, { ...doc, timestamp: FieldValue.serverTimestamp() }, { merge: true });
            });

            try {
                await batch.commit();

                console.log(`${report.length} Documents uploaded to Firestore`);

                process.exit(0);
            }
            catch (e) {

                console.log(e.message);

                process.exit(-1);
            }

        } else
            console.log('Exceeded max. number of Documents');
    }

}
