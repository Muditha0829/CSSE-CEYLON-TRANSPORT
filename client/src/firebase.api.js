//Firebase libraries
import {firestore} from './firebase.config';
import { doc, setDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const db = firestore;

export function registerLocalUser(user){
    
        const auth = getAuth();

    try{
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

    
        })

    }catch(error){
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // return res.status(errorCode).send({message: errorMessage});
    }
    }
    
  

export function registerForeignUser(_email,_password,_fullName,_passportNo,_contactNo){
    // const ref = collection(firestore, "userData");

    // addDoc(ref,)

}