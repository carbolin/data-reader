import { AppInitiator } from './app-initiator';
import { FirebaseConfig } from '../../models/firebase-config.interface';
import { firestore } from 'firebase';

export class DbInitiator extends AppInitiator {

    constructor(protected firebaseConfig: FirebaseConfig) {

        super(firebaseConfig);
    }

    dbInit(): firestore.Firestore {

        this.init();

        return firestore();
    }
}
