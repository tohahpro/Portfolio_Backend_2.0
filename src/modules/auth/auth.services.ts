import { prisma } from "../../config/db"


const loginWithEmailAndPass = async ({email, password}: {email: string, password: string}) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
   
    if(!user){
        throw new Error("User Not Found")
    }
    if(password === user.password){
        return user
    }
    else{
        throw new Error("Password is Incorrect")
    }
}

export const AuthService = {
    loginWithEmailAndPass
}