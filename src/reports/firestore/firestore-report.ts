import { OutputTarget } from '../../models/OutputTarget';
import { firestore } from 'firebase';

export class FirestoreReport<T> implements OutputTarget<T> {

    constructor(private db: firestore.Firestore, private collection: string) { }

    async print(report: T[]): Promise<void> {

        if (report.length <= 500) {

            const batch: firestore.WriteBatch = this.db.batch();

            const collectionRef: firestore.CollectionReference<firestore.DocumentData>
                = this.db.collection(this.collection);

            const FieldValue = firestore.FieldValue;

            report.forEach((doc: firestore.DocumentData) => {
                const docRef: firestore.DocumentReference<firestore.DocumentData>
                    = collectionRef.doc();

                batch.set(docRef, { ...doc, timestamp: FieldValue.serverTimestamp() });
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
