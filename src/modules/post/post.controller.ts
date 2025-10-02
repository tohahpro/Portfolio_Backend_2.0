import { Request, Response } from "express";
import { PostService } from "./post.services";

const createPost = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.createPost(req.body)
        res.status(201).json(result)        
    } catch (error) {
        res.status(500).send(error);        
    }
}

const getAllPost = async(req: Request, res: Response)=>{
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search as string || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
        const sortOrder = (req.query.sortOrder === 'desc') ? 'desc' : 'asc';
        
        const result = await PostService.GetAllPost({ page, limit, search, isFeatured, tags, sortOrder })
        res.status(201).json(result)        
    } catch (error) {
        res.status(500).send(error);        
    }
}

const getPostById = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.getPostById(Number(req.params.id))
        res.status(201).json(result)         
    } catch (error) {
        res.status(500).send(error);        
    }
}

const updatePost = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.updatePost(Number(req.params.id), req.body)
        res.status(201).json(result)         
    } catch (error) {
        res.status(500).send(error);        
    }
}

const deletePost = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.deletePost(Number(req.params.id))
        res.status(201).json(result)         
    } catch (error) {
        res.status(500).send(error);        
    }
}

const getBlogStats = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.getBlogStats()
        res.status(201).json(result)         
    } catch (error) {
        res.status(500).send(error);        
    }
}

export const PostController = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
    getBlogStats
}