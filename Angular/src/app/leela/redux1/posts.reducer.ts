import { Action, INIT, createReducer, on } from "@ngrx/store";
import { initialState1 } from "./post.state";
import { addPost, deletePost, updatePost } from "./post.action";

// export const storeInitAction = '@ngrx/store/init';

// // Define the action interface
// interface StoreInitAction extends Action {
//     type: typeof storeInitAction;
// }

// export function storeInit(): StoreInitAction {
//     return {
//         type: storeInitAction,
//     };
// }

const _postsReducer = createReducer(initialState1,
    on(addPost, (state, action) => {

        // console.log(state)

        let post = { ...action.post }

        post.id = state.posts.length.toString()

        return {
            ...state,
            posts: [...state.posts, post]
        }

    }),
    on(updatePost, (state, action) => {
        console.log(state)
        console.log(action)
        const updatedPosts = state.posts.map((post) => {

            return action.post.id === post.id ? action.post : post;

        })
        // console.log(updatedPosts)
        return {
            ...state,
            posts: updatedPosts
        }


    }),
    on(deletePost, (state, action) => {

        console.log(action)
        console.log(state)

        const filteredPosts = state.posts.filter((post) => {

            return action.id !== post.id

        })

        return {
            ...state,
            posts: filteredPosts
        }
    }),
    // on(storeInit, () => initialState)
)

export function postReducer(state = initialState1, action: Action) {
    return _postsReducer(state, action)
}