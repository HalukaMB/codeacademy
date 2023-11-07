import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'
import { useNavigate } from 'react-router';



const LoginFeature = () => {
    const { user, signup } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const authenticationContext=useContext(AuthenticationContext)
    console.log("authenticationContext :>> ", authenticationContext);
    const userstate=authenticationContext.user
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const validatePassword = (password: string, repeatPassword: string) => {
        return password === repeatPassword;
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validPassword = validatePassword(password, repeatPassword);
        if (validPassword) {
          console.log("Attempting to sign up with: ", email, password);
          signup(email, password);
        } else {
          console.log("Passwords do not match");
        }
      };
    
      useEffect(() => {
        if (user) {
          navigate("/Logout");
        }
      }, [user, navigate]);

      const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };
    
      const handleRepeatPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        setRepeatPassword(e.target.value);
      };
    

    const changeStatus=()=>{
        console.log("status checked: ",user)

        if(user==false){
            authenticationContext.login()
        }
        if(user==true){
            authenticationContext.logout()
        }
    }
    
    console.log(user)
  return (
    <>
    <div>Here is the current state: {String(authenticationContext.user)} </div>
    <button onClick={()=>{console.log("CLICKED");
    changeStatus()}
}>Change Status</button>

<form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          className="form-control"
          id="repeatPassword"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </>
  )
}

export default LoginFeature