import { FirebaseConfig } from '../../models/firebase-config.interface';
import firebase from 'firebase/app';


export class AppInitiator {

    constructor(protected firebaseConfig: FirebaseConfig) { }

    protected init(): void {

        firebase.initializeApp(this.firebaseConfig);
    }

}
