import { ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import * as dotenv from "dotenv";

dotenv.config()

const jwtOptions={
    jwtFromRquest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_TO_USE
}

const jwtStrategy = new JwtStrategy(jwtOptions, async function(
    jwt_payload, done
){
    try {
        const user = await userModel.findOne({_id: jwt_payload.sub})
        if(user){
            return done(null, user)
        }
        if(!user){
            return done(null,false)
        }
    } catch (error) {
        return done(err, false);
    }
})

const passportConfig = (passport)=>{
    passport.use(jwtStrategy)
}

export default passportConfig;