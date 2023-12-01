import React, { ChangeEvent, useState } from 'react'
import { Navbar } from './Navbar';

type UserImageType = {
    userImage: string;
};

interface User extends UserImageType {
    username: string;
    email: string;
    password: string;
}

export const Register = () => {

    const [newUser, setNewUser] = useState<User | null>(null);
    const [warnings, setWarnings] = useState<string[] | []>([])
    const [success, setSuccess] = useState<string|null>(null)



    const handleRegisterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("e.target.name :>> ", e.target.name);
        console.log("e.target.value :>> ", e.target.value);


        setNewUser({ ...newUser!, [e.target.name]: e.target.value });
    };

    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let localwarnings: string[] = []
        if (!newUser?.email.includes("@")) {
            localwarnings.push(
                "It does not seem like this is a proper e-mail address"
            )
        }
        if ((!newUser?.password) || (newUser?.password.length < 6)) {
            localwarnings.push(
                "The password needs to be at least 6 characters long")

        }

        if (!(localwarnings.length > 0)) {
            console.log("newUser :>> ", newUser);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("username", newUser!.username);
            urlencoded.append("email", newUser!.email);
            urlencoded.append("password", newUser!.password);

            const baseUrl = (import.meta.env.VITE_BASE_URL_API)

            const registerUrl = baseUrl + "users/register"



            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
            };

            fetch(registerUrl, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log("result", result)
                    console.log(result.status)
                    console.log(result.message)
                    if (result.status == "409") {
                        localwarnings.push((result.message))
                        setWarnings(localwarnings)
                    }
                    if (result.status == "201") {
                        setWarnings([])
                        setSuccess(result.message)
                    }
                })
                .catch((error) => {
                    console.log("error", error)
                    console.log((error.message))
                }
                )
        };
    }

    return (
        <div>
       
                <form onSubmit={register} action="" className="input-container">
                <div className="input-container-register">

                    <label htmlFor="username">User Name</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleRegisterInputChange}
                    />
                    </div>
                    <div className="input-container-register">

                    <label htmlFor="email">Mailadress</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleRegisterInputChange}
                    />
                    </div>
                    <div className="input-container-register">

                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={handleRegisterInputChange}
                    />
                    </div>
                    <button>register</button>
                </form>
                {success&& <div className='success'>{success}</div>}
                {warnings && warnings.map((element, index) => {
                    console.log(element)
                    return (
                        <div className="warnings" key={index}>
                            {element}
                        </div>)
                }
                )
                }
            </div>
    )
}
