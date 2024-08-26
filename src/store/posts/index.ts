import { defineStore } from "pinia";
import {computed, ref, watch} from 'vue';
import {PostModalInfoType, PostType} from "../../services/posts/types.ts";
import { API } from "../../services";
import { APIResponse } from "../../services/types.ts";
import { AxiosError } from "axios";
import {formatCommentDate} from "../../components/shared/utils/formatCommentDate.ts";
import {useAlertsStore} from "../alerts";
import {initAlert} from "../../components/shared/plugins/alert.ts";

export const usePostsStore = defineStore("postsStore", () => {


    const posts = ref<PostType[]>([]);
    const tags = ref<string[]>([]);
    const postModalInfo = ref<PostModalInfoType>({
        post: null,
        showModal: false,
    })
    const isLoadingPosts = ref<boolean>(false)

    function initPosts(data: PostType[]): void {
        posts.value = data;
    }


    function initTags(data: PostType[]): void {
        const allTags = data.reduce((acc, post) => acc.concat(post.tags), [] as string[]);
        tags.value = Array.from(new Set(allTags));
    }

    function initPostModalInfo(payload: PostModalInfoType): void {
        postModalInfo.value = payload
    }

    function initAddPostComment(payload: {id: number, comment: string}): void {
        const post = posts.value.find((item) => item.id === payload.id);
        if (post) {
            post.comments.unshift({
                name: 'Никита Кухарчук',
                text: payload.comment,
                date: formatCommentDate(),
                avatar: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
            })
        }
    }



    async function dispatchGetPosts(): Promise<APIResponse<null>> {
        isLoadingPosts.value = true;
        try {
            const { status, data } = await API.posts.getPosts();
            if (status === 200) {
                initPosts(data.content);
                initTags(data.content);
                return { success: true, content: null };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            initAlert(error.message)
            return { success: false, status: _error.response?.status, content: null };
        } finally {
            isLoadingPosts.value = false;
        }
        return { success: false, content: null, status: 400 };
    }

    return {
        posts,
        tags,
        dispatchGetPosts,
        initPostModalInfo,
        postModalInfo,
        isLoadingPosts,
        initAddPostComment
    };
});