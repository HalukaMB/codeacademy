import { ChangeEvent, useContext, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';

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
    const { userChecked, setUserChecked } = useContext(AuthenticationContext)

    const [warnings, setWarnings] = useState<string[] | []>([])
    const [success, setSuccess] = useState<string | null>(null)



    const handleRegisterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser!, [e.target.name]: e.target.value });
    };

    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let localwarnings: string[] = []
        if (newUser==null){
            localwarnings.push(
                "You have not typed anything yet")
        }
        if (!newUser?.email.includes("@")) {
            localwarnings.push(
                "It does not seem like this is a proper e-mail address")
        }
        if ((!newUser?.password) || (newUser?.password.length < 6)) {
            localwarnings.push(
                "The password needs to be at least 6 characters long")
        }
        setWarnings(localwarnings)
        if (!(localwarnings.length > 0)) {
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

                    if (result.status == "409") {
                        localwarnings.push((result.message))
                        setWarnings(localwarnings)
                    }
                    if (result.status == "201") {
                        setWarnings([])
                        const userinfo=result.user
                        console.log(result)
                        localStorage.setItem("token", result.token)

                        setUserChecked({"name":userinfo.userName, "id":userinfo.id,"foundTrashPlaces":null,"cleanedTrashPlaces":null})

                        setSuccess(result.message)
                    }
                })
                .catch((error) => {
                    setWarnings((error.message))
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
                            type="password"
                            name="password"
                        id="password"
                        onChange={handleRegisterInputChange}
                    />
                </div>
                <button>register</button>
            </form>
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
    )
}
