import Post from '../models/postModel.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {

    if(!req.user.isAdmin) {
        return next(errorHandler(403, "Unauthorized action!!"))
    }

    if(!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Missing required field inputs!!"))
    }

    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9]/g, "")

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    })

    try {
        const savedPost = await newPost.save() 
        
        res.status(201).json(savedPost)
    } catch (error) {
        return next(error)
    }
}