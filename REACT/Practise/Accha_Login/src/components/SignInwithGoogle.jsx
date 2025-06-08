import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import React from 'react';
import { toast } from 'react-toastify';
import googleLogo from '../assets/google.png'; //

function SignInwithGoogle () {

    // It is created for the google login popup
    function googleLogin(){
        // here we declare the function for which we have to add the login
        // i.e for google we write (GoogleAuthProvider)
        // i.e for google we write (FacebookAuthProvider)
         const provider= new GoogleAuthProvider();

        //  then works as a Promise
        // the auth stores the user details
         signInWithPopup(auth, provider).then(async(result)=>{
            console.log(result);

            // when the user is successfully login then 
            // we redirect it to the profile.js section
            toast.success("user registered suceessfully!", {
            position:"top-center",
          });
            if(result.user){
                window.location.href="/profile";
            }
         })
    }

  return (
    <div>
        <p className="continue-p">--Or continue with--</p>
        <div style={{display:"flex", justifyContent:"center", cursor:"pointer"}}
            // here onclick redirects us to the Googlelogin popup
            onClick={googleLogin}
        >
            <img src={googleLogo} width={"60%"} />    

        </div>
    </div>
  );
}

export default SignInwithGoogle;