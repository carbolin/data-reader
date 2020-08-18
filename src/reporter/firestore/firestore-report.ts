import { OutputTarget } from '../../models/OutputTarget';

export class FirestoreReport<T> implements OutputTarget<T> {

    constructor(private db: firebase.firestore.Firestore, private collection: string) { }

    async print(report: T[]): Promise<void> {

        if (report.length <= 500) {

            const batch: firebase.firestore.WriteBatch = this.db.batch();

            const collectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
                = this.db.collection(this.collection);

            report.forEach((doc: firebase.firestore.DocumentData) => {
                const docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
                    = collectionRef.doc();

                batch.set(docRef, doc);
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
            console.log('Exceeded max. number of Documents for Upload');
    }

}
