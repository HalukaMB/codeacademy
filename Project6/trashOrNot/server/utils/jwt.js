import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config()

const issueToken = (userID)=>{
    console.log("issueToken")
    const signOptions = {
        expiresIn: "1day",
        issuer: "HMB"
    }
    const payload = {
        sub: userID
    }
    const secretOrPrivateKey= process.env.SECRET_TO_USE

    const token = jwt.sign(payload, secretOrPrivateKey, signOptions)

    return token

}

export{ issueToken}