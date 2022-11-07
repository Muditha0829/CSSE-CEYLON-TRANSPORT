//Firebase libraries
import {db} from './firebase.config';
import { doc, setDoc,getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged ,signOut} from "firebase/auth";


// const db = firestore;
const auth = getAuth();

export function userCheck(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid)
          return uid;
          // ...
        } else {
          // User is signed out
          console.log('No User');
          return 'No-User';
        }
      });
}

export function userSignOut(){
    signOut(auth);
}

export function registerLocalUser(user){

            createUserWithEmailAndPassword(auth, user.email, user.password).then((userCredential)=>{
            
            const userFromDb = userCredential.user;
            const userId = userCredential.user.uid;
            
            console.log(userCredential);
            console.log(userFromDb);
            
            const userDoc = {
            "uid":userId,
            "email":user.email,
            "fullName":user.fullName,
            "userType":'local',
            "nic":user.nic,
            "phoneNo":user.phoneNo
             }

            setDoc(doc(db, "userData", userId), userDoc);

        }).catch((error) => {
            if (error.code ==="auth/email-already-in-use") {
                console.log("The email address is already in use");
                // return "The email address is already in use";
            }else if (error.code === "auth/invalid-email") {
                console.log("The email address is not valid.");
            } else if (error.code === "auth/operation-not-allowed") {
                console.log("Operation not allowed.");
            } else if (error.code === "auth/weak-password") {
                console.log("The password is too weak.");
            }

            return error;



          });

    }
    
    
  

export function registerForeignUser(user){
    
    createUserWithEmailAndPassword(auth, user.email, user.password).then((userCredential)=>{
            
        const userFromDb = userCredential.user;
        const userId = userCredential.user.uid;
        
        console.log(userCredential);
        console.log(userFromDb);
        
        const userDoc = {
        "uid":userId,
        "email":user.email,
        "fullName":user.fullName,
        "userType":'foreign',
        "passportNo":user.passportNo,
        "phoneNo":user.phoneNo
         }

        setDoc(doc(db, "userData", userId), userDoc);

    }).catch((error) => {
        if (error.code ==="auth/email-already-in-use") {
            console.log("The email address is already in use");
        }else if (error.code === "auth/invalid-email") {
            alert("The email address is not valid.");
        } else if (error.code === "auth/operation-not-allowed") {
            alert("Operation not allowed.");
        } else if (error.code === "auth/weak-password") {
            alert("The password is too weak.");
        }



      });

}

//Get User Data
export function getData(id) {
    return new Promise((resolve,reject)=>{
        db.collection("userData").doc(id).get().then((snapshot) => {
            resolve(snapshot.data());
            // console.log(snapshot.data())
            }).catch((e) => {
            reject(e);
            })
    })
}

//Update User Data - Local
export function updateUserDataLocal(id,updatedDoc){
    return new Promise((resolve,reject)=>{
        db.collection("userData").doc(id).update({
            fullName:updatedDoc.fullName,
            nic:updatedDoc.nic,
            phoneNo:updatedDoc.phoneNo

        }).then((res)=>{
            console.log('Updated');
            resolve('Updated')
        }).catch((e)=>{
            reject(e);
        })
    })
}

//Update User Data - Foreign
export function updateUserDataForeign(id,updatedDoc){
    return new Promise((resolve,reject)=>{
        db.collection("userData").doc(id).update({
            fullName:updatedDoc.fullName,
            passportNo:updatedDoc.passportNo,
            phoneNo:updatedDoc.phoneNo

        }).then((res)=>{
            console.log('Updated');
            resolve('Updated')
        }).catch((e)=>{
            reject(e);
        })
    })
}

export function getAllData(){
    return new Promise((resolve,reject)=>{
        const docRef = doc(db, "userData", "KMGlh8RrzwexEAISii2eWeEWuHj1");
        try{
            const docSnap =  getDoc(docRef);
        console.log(docSnap.data());
        }catch (e) {
            console.log("Error getting cached document:", e);
          }
    })
}

