import { AppInitiator } from './app-initiator';
import firebase from 'firebase';
import { FirebaseConfig } from '../../models/FirebaseConfig';


export class DbInitiator extends AppInitiator {

    constructor(protected firebaseConfig: FirebaseConfig) {

        super(firebaseConfig);
    }

    dbInit(): firebase.firestore.Firestore {

        this.init();

        return firebase.firestore();
    }
}
