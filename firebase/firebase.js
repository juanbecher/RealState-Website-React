import app from "firebase/app";
import firebaseConfig from "./config";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import React from "react";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
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

//   async getPropiedad() {
//     // var datos ;
//     // this.db.collection("propiedades")
//     // .orderBy("creado", "desc")
//     // .onSnapshot((snapshot) => {
//     //     datos = snapshot.docs.map((doc) => {
//     //       return {
//     //         id: doc.id,
//     //         ...doc.data(),
//     //       };
//     //     });
//     //     console.log(datos);
//     //   });

//     // return datos;
//     // const [datos, setdatos] = useState([])
//     // var starCountRef = this.db.collection("propiedades");
//     // console.log(starCountRef);
//     // var datos = [];
//     // state = {
//     //     items: []
//     //   }
//     // starCountRef.onSnapshot((snapshot) => {
//     //     const data = snapshot.docs.map((doc) => {
//     //               return {
//     //                 id: doc.id,
//     //                 ...doc.data(),
//     //               };
//     //             });
//     //         datos = data;
//     // });

//     return this.db
//       .collection("propiedades")
//       .get()
//       .then((querySnapshot) => {
//         return querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           // console.log(doc.id, " => ", doc.data());
//           // datos.push(doc.id)
//         //   console.log(doc.id)
//           return doc.id;
//           // this.setState({ items : doc.id })
//         });
//       })
//       .catch((error) => {
//         // console.log("Error getting documents: ", error);
//       });
//     // console.log(this.state.items);
//     // return datos;
//   }
}

const firebase = new Firebase();
export default firebase;
