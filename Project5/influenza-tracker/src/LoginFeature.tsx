import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'
import { useNavigate } from 'react-router';


type loginOrSignUpType = 'signup' | 'login';
const LoginFeature = () => {
    const { user, signup, login } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const authenticationContext=useContext(AuthenticationContext)
    console.log("authenticationContext :>> ", authenticationContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loginOrSignUp, setLoginOrSignUp] = useState<loginOrSignUpType>("login")
    
    const validatePassword = (password: string, repeatPassword: string) => {
        return password === repeatPassword;
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(loginOrSignUp==="signup"){
        const validPassword = validatePassword(password, repeatPassword);
        if (validPassword) {
          console.log("Attempting to sign up with: ", email, password);
          signup(email, password);
        } else {
          console.log("Passwords do not match");
        }
      }
      if(loginOrSignUp==="login"){
        login(email, password);
      }
      };
    
      useEffect(() => {
        if (user) {
          navigate("/logout");
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
    
    
    const handleFormToggle=()=>{if(loginOrSignUp=="login"){setLoginOrSignUp("signup")}
  if(loginOrSignUp=="signup"){setLoginOrSignUp("login")} }
  return (
    <>

<div className="signUpForm">

{(loginOrSignUp=="signup")?
<>
<div className="toggleLogSign">
<button onClick={handleFormToggle}>Switch to Log In</button>
<button onClick={handleFormToggle} disabled>Switch to Sign Up</button>
</div>


<h1>Sign Up</h1></>
:
<>
<div className="toggleLogSign">
<button onClick={handleFormToggle} disabled>Switch to Log In</button>
<button onClick={handleFormToggle}>Switch to Sign Up</button>
</div>
<h1>Log In</h1>
</>
}

<form onSubmit={handleSubmit}>
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
       {(loginOrSignUp=="signup")&&
          <input
            type="password"
            className="form-control"
            id="repeatPassword"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
          />}
        {(loginOrSignUp=="signup")?
        <button type="submit" className="btn btn-primary">Sign Up</button>
        :
        <button type="submit" className="btn btn-primary">Log In</button>}
        </form>
        </div>
        
    </>
  )
}

export default LoginFeature