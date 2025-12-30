import express from "express";
import prisma from "../config/prisma.js";
const blogRouter = express.Router();
//create a blog
blogRouter.post("/new", async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(409).json({
                msg: "provide title and content!!"
            });
        }
        // const blog = await prisma.blog.create({
        //     data: {
        //         title,
        //         content,
        //         // authorId //fetch from jwt stored in cookie
        //     }
        // })
    }
    catch (error) {
    }
});
//delete a blog
//like a blog
//unlike a blog
//get blogs (public)
export default blogRouter;
//# sourceMappingURL=blog.js.map