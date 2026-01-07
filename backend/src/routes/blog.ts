import express from "express";
import prisma from "../config/prisma.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const blogRouter = express.Router();
blogRouter.use(verifyUser);

//create a blog
blogRouter.post("/new", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(409).json({
        msg: "provide title and content!!",
      });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: req.user.id,
      },
    });

    res.json({
      blog: {
        title: blog.title,
        content: blog.content,
        createdAt: blog.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "something went wrong!!",
    });
  }
});

//delete a blog
blogRouter.delete("/delete/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      res.status(404).json({
        msg: "blog id must be provided!!",
      });
    }

    const deleteBlog = await prisma.blog.delete({
      where: {
        id: blogId as string,
      },
    });

    res.json({
      msg: "deleted blog!!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "something went wrong!!",
    });
  }
});

//check if already liked
blogRouter.get("/checkLike/:blogId", async (req, res) => {
  try {
    const userId = req.user.id
    const {blogId} = req.params

    const alreadyLiked = await prisma.like.findFirst({
      where: {
        userId: userId,
        postId: blogId
      }
    })

    if(alreadyLiked){
      return res.json({
        msg: "already like",
        isLiked: true
      })
    }

    res.json({
      msg: "not liked",
      isLiked: false
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: "something went wrong!!"
    })
  }
})

//like a blog
blogRouter.post("/like/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;

    const alreadyLiked = await prisma.like.findFirst({
      where: {
        userId: req.user.id,
        postId: blogId,
      },
    });

    if (alreadyLiked) {
      try {
        const unlike = await prisma.like.delete({
          where: {
            userId_postId: {
              userId: req.user.id,
              postId: blogId,
            },
          },
        });

        if (!unlike) {
          return res.status(500).json({
            msg: "couldn't unlike blog!!",
          });
        }

        return res.json({
          msg: "unliked successfully!!",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          msg: "couldn't unlike blog!!",
        });
      }
    }

    const like = await prisma.like.create({
      data: {
        userId: req.user.id,
        postId: blogId,
      },
    });

    if (like) {
      res.json({
        msg: "liked post!!",
      });
    }

    res.status(500).json({
      msg: "couldn't like the post!!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "something went wrong!!",
    });
  }
});

//count likes in a post
blogRouter.get("/getlikes/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      res.status(404).json({
        msg: "please provide blog id!!",
      });
    }

    const likes = await prisma.like.findMany({
      where: {
        postId: blogId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.json({
      likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "something went wrong!!",
    });
  }
});

//get blogs (mine)
blogRouter.get("/myblogs", async (req, res) => {
  try {
    const userId = req.user.id;
    const {createdAt, id} = req.query

    const cursor = {
        createdAt,
        id
    }

    const blogs = await prisma.blog.findMany({
        take: 5,
        skip: createdAt && id ? 1 : 0,
        cursor: createdAt && id ? {
            createdAt_id: {
                createdAt: cursor.createdAt as string,
                id: cursor.id as string
            }
        } : undefined,
      where: {
        authorId: userId,
      },
      orderBy: [{createdAt: "desc"}, {id: "desc"}],
      include: {
        author: {
            select: {
                username: true
            }
        }
      }
    },
);

const nextCursor = blogs.length > 0 ? {
    createdAt: blogs[blogs.length - 1].createdAt,
    id: blogs[blogs.length - 1].id
} : null

    res.json({
      blogs,
      nextCursor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "something went wrong!!",
    });
  }
});

//get blogs (all)
interface Icursor {
  createdAt: string;
  id: string;
}
blogRouter.get("/feed", async (req, res) => {
  try {
    const { createdAt, id } = req.query;

    const cursorVal = {
        createdAt,
        id
    }

    const blogs = await prisma.blog.findMany({
      take: 5,
      skip: createdAt && id ? 1 : 0,
      cursor: createdAt && id
        ? {
            createdAt_id: {
              createdAt: cursorVal.createdAt as string,
              id: cursorVal.id as string,
            },
          }
        : undefined,
      where: {
        isPublic: true,
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    const nextCursor = blogs.length > 0 ? {
        createdAt: blogs[blogs.length - 1].createdAt,
        id: blogs[blogs.length - 1].id
    } : null

    res.json({
      blogs,
      nextCursor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("something went wrong!!");
  }
});

//change visibiltiy (public/ private)
blogRouter.post("/change/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    const updateBlog = await prisma.blog.update({
      where: {
        id: blogId,
        authorId: req.user.id,
      },
      data: {
        isPublic: !blog?.isPublic,
      },
    });

    if (updateBlog) {
      res.json({
        msg: "visibility changed successfully!!",
        isPublic: updateBlog.isPublic
      });
    }

    res.json({
      msg: "can't change visibility!!",
      isPublic: updateBlog.isPublic
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "something went wrong!!",
    });
  }
});

export default blogRouter;
