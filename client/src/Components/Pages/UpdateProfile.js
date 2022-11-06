import { useEffect,useState } from "react"
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { updateUserData } from "../../firebase.api";


export function UpdateProfile(){

    const [userId, setUserId] = useState([]);
    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);



    const loader = async () => {
        // const user = await getUser();
        onAuthStateChanged(getAuth(),(user1)=>{
          if (user1) {
            setUser(user1);
            setUserId(user1.uid)
          }
        })
      }

    useEffect(()=>{
        loader();
        // getFromDb();
    })

    updateUserData(user.uid);

    return(
        <div>
            <center>
            <h1>Update Profile</h1>
            </center>
        </div>
    )
}