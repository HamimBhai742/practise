import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default{
    port:Number(process.env.PORT),
    jwt:{
        access_secret:process.env.JWT_SECRET_TOKEN,
        access_expires_in:process.env.JWT_EXPIRE_IN
    }
}