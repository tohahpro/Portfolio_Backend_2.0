import { prisma } from "../../config/db";
import { Prisma, User } from '@prisma/client';

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {

    const createdUser = await prisma.user.create({
        data: payload
    })
    return createdUser;

}

const getAllUser = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true, 
            email: true, 
            role: true,
            phone: true, 
            picture: true,
            status: true,
            isVerified: true, 
            post: true,
            createdAt: true,
            updatedAt: true, 
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return result
}



const getUserById = async (id: number) =>{
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        select:{
            id: true,
            name: true, 
            email: true, 
            role: true,
            phone: true, 
            picture: true,
            status: true,
            isVerified: true, 
            post: true,
            createdAt: true,
            updatedAt: true, 
        }
    })
    return result
}

const updateUser = async (id: number, payload: Prisma.UserCreateInput):Promise<User> =>{
    const result = await prisma.user.update({
        where: {id},
        data: payload
    })
    return result;
}

const deleteUser = async (id: number,) =>{
    const result = await prisma.user.delete({
        where: {id}
    })
    return result;
}

export const UserService = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}