const getToken = () => {
    const localtoken = localStorage.getItem("token")
    return localtoken
}

const isUserLoggedIn = () => {
    const token = getToken()
    return token ? true : false
}

const verifyToken = ()=>{
    const getToken = isUserLoggedIn()
    const baseUrl = (import.meta.env.VITE_BASE_URL_API)

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
   const urlencoded = new URLSearchParams();

   const requestOptions = {
       method: "GET",
       headers: myHeaders,
       body: urlencoded,
   };
   const getUrl = baseUrl + "user/verify"


   fetch(getUrl, requestOptions)
       .then((response) => response.json())
       .then((result) => console.log("result", result),
       )
       .catch((error) => console.log("error", error));
}

