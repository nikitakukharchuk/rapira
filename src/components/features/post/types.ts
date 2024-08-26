import {PostType} from "@/services/posts/types.ts";

export type PostListPropsType = {
    posts: PostType[];
}

export type PostPropsType = {
    post: PostType | null;
    isInModal?: boolean
}