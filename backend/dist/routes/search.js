import express from "express";
import prisma from "../config/prisma.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { flatArr } from "../helpers/flatArr.js";
const searchRouter = express.Router();
searchRouter.use(verifyUser);
searchRouter.get("/", async (req, res) => {
    try {
        const { searchQuery } = req.query;
        const blogs = await prisma.blog.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        content: {
                            contains: searchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        tags: {
                            some: {
                                tag: {
                                    name: {
                                        contains: searchQuery,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                author: {
                    select: {
                        username: true,
                    },
                },
                tags: {
                    select: {
                        tag: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        const formattedBlogs = flatArr({ blogs: blogs });
        res.json({
            blogs: formattedBlogs,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "something went wrong!!",
        });
    }
});
export default searchRouter;
//# sourceMappingURL=search.js.map