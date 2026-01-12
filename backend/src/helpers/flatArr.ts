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
  const formattedBlogs = blogs.map((blog: { tags: { tag: { id: string; name: string; }; }[]; }) => ({
    ...blog,
    tags: blog.tags.map((t: { tag: { id: string; name: string; }; }) => ({
      id: t.tag.id,
      name: t.tag.name,
    })),
  }));

  return formattedBlogs;
};
