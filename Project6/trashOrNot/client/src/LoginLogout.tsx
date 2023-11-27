import React, { ChangeEvent, useState } from 'react'

type UserImageType = {
    userImage: string;
  };
  
  interface User extends UserImageType {
    userName: string;
    email: string;
    password: string;
  }

export const LoginLogout = () => {

    const [newUser, setNewUser] = useState<User | null>(null);

    
      const handleRegisterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("e.target.name :>> ", e.target.name);
        console.log("e.target.value :>> ", e.target.value);
    
        setNewUser({ ...newUser!, [e.target.name]: e.target.value });
      };

    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e)
        console.log("newUser :>> ", newUser);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        const urlencoded = new URLSearchParams();
        urlencoded.append("userName", newUser!.userName);
        urlencoded.append("email", newUser!.email);
        urlencoded.append("password", newUser!.password);

        const baseUrl=(import.meta.env.VITE_BASE_URL_API)

        const registerUrl=baseUrl+"users/register"

        console.log(registerUrl)
        
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
        };
    
        fetch(registerUrl, requestOptions)
          .then((response) => response.json())
          .then((result) => console.log("result", result))
          .catch((error) => console.log("error", error));
      };

  return (
    <div>
      <div className="input-container">
        <form onSubmit={register} action="" className="input-container">
        <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            onChange={handleRegisterInputChange}
          />
          <label htmlFor="userName">Mailadress</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleRegisterInputChange}
          />
          <label htmlFor="email">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={handleRegisterInputChange}
          />
          <button>register</button>
        </form>

      </div>
    </div>
  )
}
