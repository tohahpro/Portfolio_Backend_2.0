import { Prisma, Project } from "@prisma/client";
import { prisma } from "../../config/db";


const createProject = async (payload: Prisma.ProjectCreateInput): Promise<Project> => {

    const result = await prisma.project.create({
        data: payload
    })
    return result;
}

const GetAllProject = async ({ page = 1, limit = 10, search, sortOrder }
    : {
        page?: number,
        limit?: number,
        search?: string,
        isFeatured?: boolean,
        tags?: string[],
        sortOrder?: "asc" | "desc"
    }) => {
    const skip = (page - 1) * limit;
    const where: any = {
        AND: [
            search && {
                OR: [
                    { projectName: { contains: search, mode: "insensitive" } }
                ]
            }
        ].filter(Boolean)
    }

    const result = await prisma.project.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
            createdAt: sortOrder
        }
    })

    const total = await prisma.project.count({ where })

    return {
        data: result,
        pagination: {
            page, limit, total,
            totalPages: Math.ceil(total / limit)
        }
    }
}

const getProjectById = async (id: number) => {
    return await prisma.project.findUnique({
        where: { id }
    })
}

const updateProject = async (id: number, payload: Prisma.ProjectCreateInput): Promise<Project> => {
    const result = await prisma.project.update({
        where: { id },
        data: payload
    })
    return result;
}

const deleteProject = async (id: number,) => {
    const result = await prisma.project.delete({
        where: { id }
    })
    return result;
}


export const ProjectService = {
    createProject,
    GetAllProject,
    getProjectById,
    updateProject,
    deleteProject
}