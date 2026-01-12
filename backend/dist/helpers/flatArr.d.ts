interface Input {
    blogs: ({
        author: {
            username: string;
        };
        tags: {
            tag: {
                id: string;
                name: string;
            };
        }[];
    } & {
        id: string;
        title: string;
        content: string;
        authorId: string;
        isPublic: boolean;
        createdAt: Date;
    })[];
}
export declare const flatArr: ({ blogs }: Input) => {
    tags: {
        id: string;
        name: string;
    }[];
}[];
export {};
//# sourceMappingURL=flatArr.d.ts.map