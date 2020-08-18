import firebase from 'firebase';
import { FirebaseConfig } from '../../models/FirebaseConfig';

export class AppInitiator {

    constructor(protected firebaseConfig: FirebaseConfig) { }

    protected init(): void {

        firebase.initializeApp(this.firebaseConfig);
    }

}
