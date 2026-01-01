import express from "express"
import prisma from "../config/prisma.js"
import { verifyUser } from "../middlewares/verifyUser.js"

const blogRouter = express.Router()

//create a blog
blogRouter.post("/new", verifyUser, async (req, res) => {
    try {
        const {title, content} = req.body

        if(!title || !content){
            return res.status(409).json({
                msg: "provide title and content!!"
            })
        }

        console.log(Object.keys(prisma))

        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId: req.user.id
            }
        })
        
        console.log("reached")

        res.json({
            blog: {
                title: blog.title,
                content: blog.content,
                createdAt: blog.createdAt
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: "something went wrong!!"
        })
    }
})

//delete a blog
//like a blog
//unlike a blog
//get blogs (public)

export default blogRouter