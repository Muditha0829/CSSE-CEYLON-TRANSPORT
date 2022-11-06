import { useEffect,useState } from "react"

// import { doc, getDoc } from "firebase/firestore";
import { getAuth,onAuthStateChanged } from 'firebase/auth';

// import { firestore } from "../../firebase.config";
import { getData } from "../../firebase.api";

export default function Profile(){

    // const db = firestore;

    
    const [userId, setUserId] = useState([]);
    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);

    function fetchData(){
        getData(userId).then((res)=>{
            setData(res);
        }).catch((e)=>{
            console.log(e);
        })
        // console.log(data)
    }

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
        fetchData();
        loader();
        // getFromDb();
    })

    // getAllData();
    

    return(
        <div><center>
            <h1>Profile</h1>
            {<h3>{data.fullName}</h3>}
            {<h3>{data.nic}</h3>}
            {<h3>{data.uid}</h3>}
            {<h3>{data.userType}</h3>}
            {<h3>{data.email}</h3>}
        </center>
        </div>
    )
}