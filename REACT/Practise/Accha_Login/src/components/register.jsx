import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {auth} from "./firebase";
import {db} from "./firebase";
// setDoc to store the user info.
import { setDoc, doc } from "firebase/firestore";

// Toast is used for the pop-up of sucess and failure
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
        e.preventDefault();
        try{
          await createUserWithEmailAndPassword(auth, email, password);

          // here we store the user details when he/she signin 
          // the (auth) is firstly defined in the firebase.js file from there 
          // we take that and inserted the newUser details and print here.
          // For this we have to import the auth file form line-6
          const user= auth.currentUser;
          
          console.log(user) ;

          // It stores the user  information into the firebase auth.
          if(user){
            await setDoc(doc(db, "Users", user.uid),{
              email:user.email,
              firstName:fname,
              lastName:lname,
            });
          }
          
          console.log("User registered Successfully");

          // (toast) creates the pop-up once our work is done
          toast.success("user registered suceessfully!", {
            position:"top-center",
          });
        }catch(error){
          console.log(error.message);
          toast.success(error.message, {
            position:"bottom-center",
          });
        }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
    </form>
  );
}
export default Register;