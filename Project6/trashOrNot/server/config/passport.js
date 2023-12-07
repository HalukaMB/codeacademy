import { ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import * as dotenv from "dotenv";
import userModel from "../model/UserModel.js";

dotenv.config()
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_TO_USE;


const jwtStrategy = new JwtStrategy(jwtOptions, async function(
    jwt_payload, done
){

    try {
        
        const user = await userModel.findOne({_id: jwt_payload.sub})
        if(user){
            console.log("token valid")
            return done(null, user)
        }
        if(!user){
            console.log("no user")
            return done(null,false)
        }
    } catch (error) {
        console.log("error")

        return done(error, false);
    }
})

const passportConfig = (passport)=>{
    passport.use(jwtStrategy)
}

export default passportConfig;