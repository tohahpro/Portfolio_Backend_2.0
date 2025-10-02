import { Request, Response } from "express";
import { ProjectService } from "./project.service";


const createProject = async(req: Request, res: Response)=>{
    try {
        const result = await ProjectService.createProject(req.body)
        res.status(201).json(result)        
    } catch (error) {
        res.status(500).send(error);        
    }
}

const getAllProject = async(req: Request, res: Response)=>{
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search as string || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
        const sortOrder = (req.query.sortOrder === 'desc') ? 'desc' : 'asc';
        
        const result = await ProjectService.GetAllProject({ page, limit, search, isFeatured, tags, sortOrder })
        res.status(201).json(result)        
    } catch (error) {
        res.status(500).send(error);        
    }
}

const getProjectById = async(req: Request, res: Response)=>{
    try {
        const result = await ProjectService.getProjectById(Number(req.params.id))
        res.status(201).json(result)         
    } catch (error) {
        res.status(500).send(error);        
    }
}

const updateProject = async(req: Request, res: Response)=>{
    try {
        const result = await ProjectService.updateProject(Number(req.params.id), req.body)
        res.status(201).json(result)         
    } catch (error) {
        res.status(500).send(error);        
    }
}

const deleteProject = async(req: Request, res: Response)=>{
    try {
        const result = await ProjectService.deleteProject(Number(req.params.id))
        res.status(201).json(result)         
    } catch (error) {
        res.status(500).send(error);        
    }
}


export const ProjectController = {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject
}