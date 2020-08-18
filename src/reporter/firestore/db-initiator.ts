import { AppInitiator } from './app-initiator';
import { FirebaseConfig } from '../../models/FirebaseConfig';
import firebase from 'firebase';

export class DbInitiator extends AppInitiator {

    constructor(protected firebaseConfig: FirebaseConfig) {

        super(firebaseConfig);
    }

    dbInit(): firebase.firestore.Firestore {

        this.init();

        return firebase.firestore();
    }
}
