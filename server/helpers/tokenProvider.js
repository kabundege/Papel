import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const tokenProvider = (user) =>  jwt.sign(user,process.env.JWTPRIVATEKEY)

export default tokenProvider;