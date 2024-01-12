import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';

type UserImageType = {
    userImage: string;
};

interface User extends UserImageType {
    username: string;
    email: string;
    password: string;
}

export const LoginLogout = () => {
    const { userChecked, setUserChecked } = useContext(AuthenticationContext)
    const [existingUser, setExistingUser] = useState<User | null>(null);
    const [warnings, setWarnings] = useState<string[] | []>([])
    const [success, setSuccess] = useState<string | null>(null)

    const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        setExistingUser({ ...existingUser!, [e.target.name]: e.target.value });
    };

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let localwarnings: string[] = []
        if (existingUser == null) {
            localwarnings.push(
                "You have not typed anything yet")
        }
        if (!existingUser?.email.includes("@")) {
            localwarnings.push(
                "It does not seem like this is a proper e-mail address")
        }
        if ((!existingUser?.password) || (existingUser?.password.length < 6)) {
            localwarnings.push(
                "The password needs to be at least 6 characters long")
        }
        setWarnings(localwarnings)
        if (!(localwarnings.length > 0)) {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();

            if (existingUser?.email && existingUser?.password) {
                urlencoded.append("email", existingUser.email);
                urlencoded.append("password", existingUser.password);
            }


            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
            };

            try {
                const baseUrl = (import.meta.env.VITE_BASE_URL_API)
                const loginUrl = baseUrl + "users/login"
                const response = await fetch(loginUrl, requestOptions)
                if (response.ok) {
                    const result = await response.json()
                    console.log(result)
                    if (result.token) {
                        localStorage.setItem("token", result.token)
                        setSuccess("Login Successful")
                        const username = result["user"].username
                        const userid = result["user"].id
                        const foundTrashPlaces = result["user"].reportedby
                        const cleanedTrashPlaces = result["user"].cleanedby

                        setUserChecked({ "name": username, "id": userid, "foundTrashPlaces": foundTrashPlaces, "cleanedTrashPlaces": cleanedTrashPlaces })
                    }
                }
                if (!response.ok) {
                    const result = await response.json()
                    setWarnings([result["message"]])


                }
            } catch (error) {
                console.log(error)

            }
        }
    }



    const userLogout = () => {
        localStorage.removeItem("token")
        setWarnings([])
        setSuccess(null)
        setUserChecked({ "name": "", "id": "", "foundTrashPlaces": null, "cleanedTrashPlaces": null })
    }



    return (
        <div>
            <div className="input-container-login">
                {(userChecked["name"] == "") ?
                    <form onSubmit={login} action="" className="input-container">
                        <div className="input-container-loginlogout">

                            <label htmlFor="email">Mailadress</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="input-container-loginlogout">

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <button>Login</button>
                    </form>
                    : <button onClick={userLogout}>Logout</button>}


                {success && <div className='success'>{success}</div>}
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
        </div>
    )
}
