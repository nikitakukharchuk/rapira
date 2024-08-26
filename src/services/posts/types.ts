export type PostModalInfoType = {
    post: PostType;
    showModal: boolean;
}

export type PostType = {
    id: number;
    image: string;
    date: string;
    readTime: string;
    comments: CommentType[];
    title: string;
    description: string;
    tags: string[]
};

export type CommentType = {
    name: string,
    text: string,
    date: string,
    avatar: string
}
