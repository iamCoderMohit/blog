import express from "express";
import prisma from "../config/prisma.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const tagRouter = express.Router();
tagRouter.use(verifyUser)

tagRouter.get("/find", async (req, res) => {
  try {
    const { tagName } = req.query;

    if (!tagName) {
      return res.status(404).json({
        msg: "please provide details!!",
      });
    }

    const blogs = await prisma.blog.findMany({
      where: {
        isPublic: true,
        tags: {
          some: {
            tag: {
              name: tagName as string,
            },
          },
        },
      },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    });

    res.json({
      blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "something went wrong",
    });
  }
});

export default tagRouter;
