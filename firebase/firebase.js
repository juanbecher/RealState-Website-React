import app from 'firebase/app'
import firebaseConfig from './config'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

class Firebase{
    constructor(){
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

        // Inicia sesión del usuario
        async login(email, password) {
            return this.auth.signInWithEmailAndPassword(email, password);
        }
    
        // Cierra la sesión del usuario
        async cerrarSesion() {
            await this.auth.signOut();
        }
}

const firebase = new Firebase();
export default firebase;