import { FirebaseConfig } from '../../models/FirebaseConfig';
import firebase from 'firebase';


export class AppInitiator {

    constructor(protected firebaseConfig: FirebaseConfig) { }

    protected init(): void {

        firebase.initializeApp(this.firebaseConfig);
    }

}
