import { FirebaseConfig } from '../../models/FirebaseConfig';
import firebase from 'firebase/app';


export class AppInitiator {

    constructor(protected firebaseConfig: FirebaseConfig) { }

    protected init(): void {

        firebase.initializeApp(this.firebaseConfig);
    }

}
