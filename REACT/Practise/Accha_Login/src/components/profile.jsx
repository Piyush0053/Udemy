import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { db } from "./firebase";
// setDoc to store the user info.
import { doc,  getDoc } from "firebase/firestore";

// Toast is used for the pop-up of sucess and failure
import { toast } from "react-toastify";

function profile() {
  const [userDetails, setUserDetails] = useState(null);

//  This function fetch the user data from auth
    const fetchUserData= async()=>{
        auth.onAuthStateChanged(async (user)=>{
            console.log(user);

            // it will fetch the collection(i.e -> "Users") from the user.uid
            const docRef = doc(db, "Users", user.uid);
            const docSnap= await getDoc(docRef);

            // If there is something in the userData
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
            }else{
                console.log("User is Not logged in");
            }
        })
    };
    useEffect(()=>{
        fetchUserData()
    }, []);


    // we create the Logout  function button in here.
    async function handleLogout(){
        try{
            await auth.signOut();

            // it redirects user to the login page
            window.location.href= "/login";
            console.log("User Logged out successfully!");

        }catch(error){
            console.log("error Logged out: ", error.message);

        }
    }
  return (
    <div>
      {userDetails ? (
        <>
          <h3>Welcome{userDetails.firstName} 😁</h3>
          <div>
            <p>Email:{userDetails.email}</p>
            <p>First Name:{userDetails.firstName}</p>
            <p>Last Name:{userDetails.lastName}</p>
          </div>

          {/* The functionality of this button is created on the line no. --37 where we create the logout button */}

          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>

        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default profile;
