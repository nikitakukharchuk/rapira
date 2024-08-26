// the axios instance and types
import http from "../api";
import {PostType} from "./types.ts";
import {APIResponse} from "../types.ts";

async function getPosts() {
    return await http.get<APIResponse<PostType[]>>("nikitakukharchuk/cards");
}

export default {
    getPosts,
};