export const flatArr = ({ blogs }) => {
    const formattedBlogs = blogs.map((blog) => ({
        ...blog,
        tags: blog.tags.map((t) => ({
            id: t.tag.id,
            name: t.tag.name,
        })),
    }));
    return formattedBlogs;
};
//# sourceMappingURL=flatArr.js.map