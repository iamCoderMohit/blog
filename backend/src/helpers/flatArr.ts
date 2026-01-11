interface Input {
  blogs: ({
    author: { username: string };
    tags: { tag: { id: string; name: string } }[];
  } & {
    id: string;
    title: string;
    content: string;
    authorId: string;
    isPublic: boolean;
    createdAt: Date;
  })[];
}

export const flatArr = ({ blogs }: Input) => {
  const formattedBlogs = blogs.map((blog) => ({
    ...blog,
    tags: blog.map((t: any) => ({
      id: t.tag.id,
      name: t.tag.name,
    })),
  }));

  return formattedBlogs;
};
