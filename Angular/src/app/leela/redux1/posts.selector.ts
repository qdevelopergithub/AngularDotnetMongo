import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { PostState, initialState1 } from './post.state'

export const Post_State_Name = 'posts'
const getPostState = createFeatureSelector<PostState>(Post_State_Name);

export const getPosts = createSelector(getPostState, (state) => {
    return state.posts
});

export const getPostById = (postId: string) => createSelector(
    getPostState,
    (state: PostState) => {
        return state.posts.find((post: any) => post.id === postId)
    }
);
