import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {

    const result = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return result;
}

const GetAllPost = async ({ page = 1, limit = 10, search, isFeatured, tags, sortOrder }
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
                    { title: { contains: search, mode: "insensitive" } },
                    { content: { contains: search, mode: "insensitive" } },
                ]
            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } },

        ].filter(Boolean)
    }

    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
            createdAt: sortOrder
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    const total = await prisma.post.count({ where })

    return {
        data: result,
        pagination: {
            page, limit, total,
            totalPages: Math.ceil(total / limit)
        }
    }
}

const getPostById = async (id: number) => {
    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: { increment: 1 }
            }
        })

        return await tx.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
        
    })
}

const updatePost = async (id: number, payload: Prisma.PostCreateInput): Promise<Post> => {
    const result = await prisma.post.update({
        where: { id },
        data: payload
    })
    return result;
}

const deletePost = async (id: number,) => {
    const result = await prisma.post.delete({
        where: { id }
    })
    return result;
}

const getBlogStats = async () => {
    return await prisma.$transaction(async(tx)=>{
        const totalViewsAgg = await tx.post.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true },
        })  
        
        const featuredCount = await tx.post.count({
            where: { isFeatured: true }
        })

        const topFeatured = await tx.post.findFirst({
            where: { isFeatured: true },
            orderBy: { views: 'desc' },
        })

        // advance
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);        

        const lastWeekPosts = await tx.post.count({
            where: {
                createdAt: { gte: lastWeek }
            }
        })

        return {
            stats: {
                totalPosts: totalViewsAgg._count,
                totalViews: totalViewsAgg._sum.views || 0,
                avgViews: totalViewsAgg._avg.views || 0,
                maxViews: totalViewsAgg._max.views || 0,
                minViews: totalViewsAgg._min.views || 0,
            },
            featured: { 
                count: featuredCount,
                topPost: topFeatured
            },
            lastWeekPostsCount : lastWeekPosts
        }
    })
}

export const PostService = {
    createPost,
    GetAllPost,
    getPostById,
    updatePost,
    deletePost,
    getBlogStats
}